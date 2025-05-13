
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Link } from 'react-router-dom';
import { 
  initGoogleMap, 
  addMarker, 
  createInfoWindow, 
  cleanupGoogleMaps, 
  loadGoogleMapsScript,
  removeGoogleMapsScript,
  isGoogleMapsLoaded
} from '@/utils/googleMaps';

// Types
export interface Partner {
  id: string;
  name: string;
  address: string;
  logo?: string;
  coordinates: [number, number]; // [longitude, latitude]
  featured: boolean;
  googleMapsUrl: string;
}

// Sample data (would be replaced with actual data from API/storage)
const initialPartners: Partner[] = [
  {
    id: '1',
    name: 'Posto São João',
    address: 'Av. Paulista, 1000, São Paulo',
    logo: '/placeholder.svg',
    coordinates: [-46.6546, -23.5646],
    featured: true,
    googleMapsUrl: 'https://maps.google.com/?q=-23.5646,-46.6546'
  },
  {
    id: '2',
    name: 'Supermercado Express',
    address: 'Rua Augusta, 500, São Paulo',
    logo: '/placeholder.svg',
    coordinates: [-46.6499, -23.5566],
    featured: false,
    googleMapsUrl: 'https://maps.google.com/?q=-23.5566,-46.6499'
  },
  {
    id: '3',
    name: 'Conveniência 24h',
    address: 'Av. Rebouças, 1234, São Paulo',
    logo: '/placeholder.svg',
    coordinates: [-46.6752, -23.5708],
    featured: false,
    googleMapsUrl: 'https://maps.google.com/?q=-23.5708,-46.6752'
  },
  {
    id: '4',
    name: 'Bar do Zé',
    address: 'Rua Oscar Freire, 987, São Paulo',
    logo: '/placeholder.svg',
    coordinates: [-46.6680, -23.5622],
    featured: true,
    googleMapsUrl: 'https://maps.google.com/?q=-23.5622,-46.6680'
  },
];

const Partners = () => {
  const [partners] = useState<Partner[]>(initialPartners);
  const [activePartnerId, setActivePartnerId] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const mapScriptRef = useRef<HTMLScriptElement | null>(null);
  const callbackNameRef = useRef<string>(`initGoogleMap_${Date.now()}`);
  const isInitializingRef = useRef(false);
  const isComponentMountedRef = useRef(false);
  
  const cleanupMap = () => {
    if (!isComponentMountedRef.current) return;
    
    console.log("Partners component unmounting - cleaning up Google Maps");
    
    // Cleanup map elements
    cleanupGoogleMaps(markersRef.current, infoWindowRef.current);
    
    // Clear all markers and references
    markersRef.current.clear();
    mapRef.current = null;
    infoWindowRef.current = null;
    
    // Remove script
    const callback = window[callbackNameRef.current];
    if (callback) {
      delete window[callbackNameRef.current];
    }
    
    // Remove script element
    if (mapScriptRef.current) {
      removeGoogleMapsScript(mapScriptRef.current);
      mapScriptRef.current = null;
    }
  };

  // Function to initialize the map with Google Maps
  const initMap = () => {
    // Avoid initialization if component is unmounted
    if (!isComponentMountedRef.current) return;

    // Avoid multiple initializations
    if (isInitializingRef.current || !mapContainerRef.current) {
      return;
    }
    
    isInitializingRef.current = true;
    console.log("Initializing map");

    try {
      // Check if map is already initialized
      if (mapRef.current) {
        console.log("Map already initialized, skipping");
        isInitializingRef.current = false;
        return;
      }
      
      // Initialize map centered on São Paulo
      const map = initGoogleMap('map-container', { lat: -23.5505, lng: -46.6333 }, 12);
      if (!map) {
        console.error("Failed to initialize map");
        isInitializingRef.current = false;
        return;
      }
      
      mapRef.current = map;
      
      // Add markers for each partner
      partners.forEach(partner => {
        // Convert coordinates from [lng, lat] to {lat, lng}
        const position = { lat: partner.coordinates[1], lng: partner.coordinates[0] };
        
        // Create marker
        const marker = addMarker(
          map, 
          position,
          partner.name,
          partner.featured ? '#FACC15' : '#3B82F6'
        );
        
        if (!marker) return;
        
        // Store marker reference
        markersRef.current.set(partner.id, marker);
        
        // Create info window content
        const content = `
          <div class="p-2">
            <h3 class="font-bold text-black">${partner.name}</h3>
            <p class="text-gray-700 text-sm">${partner.address}</p>
            <a href="${partner.googleMapsUrl}" target="_blank" class="text-blue-600 text-sm font-medium mt-2 inline-block">Abrir no Google Maps</a>
          </div>
        `;
        
        // Create info window
        const infoWindow = createInfoWindow(content);
        
        // Add click listener to marker
        if (window.google && window.google.maps) {
          marker.addListener('click', () => {
            if (!isComponentMountedRef.current) return;

            // Close previously opened info window
            if (infoWindowRef.current) {
              infoWindowRef.current.close();
            }
            
            // Open this info window
            infoWindow.open(map, marker);
            infoWindowRef.current = infoWindow;
            
            // Set active partner
            setActivePartnerId(partner.id);
          });
        }
      });
      
      setMapLoaded(true);
      isInitializingRef.current = false;
    } catch (error) {
      console.error("Error initializing map:", error);
      isInitializingRef.current = false;
    }
  };

  // Load Google Maps script and set up map initialization
  useEffect(() => {
    // Mark component as mounted
 isComponentMountedRef.current = true;
  
  // Check if we should load Google Maps
  const shouldLoadMaps = process.env.NODE_ENV === 'production' || 
                         process.env.VITE_GOOGLE_MAPS_API_KEY;
  
  if (!shouldLoadMaps) {
    console.warn('Google Maps API key not found. Map will not load.');
    return;
  }    
    const callbackName = callbackNameRef.current;
    
    // Define callback as a property of window
    window[callbackName] = () => {
      console.log("Google Maps API loaded via callback");
      // Only initialize if component is still mounted
      if (isComponentMountedRef.current) {
        setTimeout(initMap, 100); // Small delay to ensure DOM is ready
      }
    };
    
    // Check if Google Maps is already loaded
    if (isGoogleMapsLoaded()) {
      console.log("Google Maps already loaded, initializing directly");
      setTimeout(initMap, 100);
    } else {
      // Load the Google Maps script
      console.log("Google Maps script added to head");
      mapScriptRef.current = loadGoogleMapsScript(callbackName);
    }
    
    // Cleanup function
    return () => {
      isComponentMountedRef.current = false;
      cleanupMap();
    };
  }, []);
  
  // Setup GSAP animations - avoid DOM manipulations that could conflict with map
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate the section title
      if (sectionRef.current) {
        gsap.from('.partners-title', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      }
      
      // Animate the cards with staggered effect
      if (cardsRef.current) {
        gsap.from('.partner-card', {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
          y: 50,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'back.out(1.4)'
        });
      }
      
      // Animate the map container
      gsap.from('.map-container', {
        scrollTrigger: {
          trigger: '.map-container',
          start: 'top 80%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  // Handle clicking "View on map" button
  const handleViewOnMap = (id: string) => {
    setActivePartnerId(id);
    
    // Pan to marker
    const marker = markersRef.current.get(id);
    if (marker && mapRef.current && window.google && window.google.maps) {
      // Pan map to marker
      const position = marker.getPosition();
      if (position) {
        mapRef.current.panTo(position);
        mapRef.current.setZoom(15);
        
        // Trigger marker click to show info window
        window.google.maps.event.trigger(marker, 'click');
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative bg-gradient-to-b from-black to-blue-950 overflow-hidden"
    >
      {/* Energy circuit background SVG */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-10" viewBox="0 0 1440 800" preserveAspectRatio="none">
        <path 
          d="M0,150 Q720,350 1440,150 L1440,650 Q720,450 0,650 Z" 
          stroke="#3b82f6" 
          strokeWidth="2" 
          fill="none"
          strokeDasharray="10,15"
          className="animate-pulse"
        />
        <path 
          d="M0,200 Q720,50 1440,200 L1440,600 Q720,750 0,600 Z" 
          stroke="#facc15" 
          strokeWidth="1" 
          fill="none"
          strokeDasharray="5,10"
          className="animate-pulse"
          style={{animationDelay: '0.5s'}}
        />
      </svg>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="partners-title text-3xl md:text-5xl font-bold text-white mb-4">ONDE ENCONTRAR</h2>
          <p className="text-blue-300 text-lg max-w-3xl mx-auto">
            Descubra onde encontrar o energético BATS perto de você
          </p>
          {/* Admin link */}
          <div className="mt-4">
            <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 underline text-sm">
              Acesso Administrativo
            </Link>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mb-16 rounded-2xl overflow-hidden map-container h-[400px] bg-blue-950 border border-blue-800/30 relative">
          <div id="map-container" ref={mapContainerRef} className="w-full h-full bg-blue-950">
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-blue-300">Carregando mapa...</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Partner Cards Section */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {partners.map((partner) => (
            <Card 
              key={partner.id} 
              className={`partner-card bg-blue-900/30 border-blue-800/50 overflow-hidden transition-all duration-300 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-blue-500/20 ${partner.featured ? 'col-span-1 sm:col-span-2' : ''}`}
            >
              <div className="p-4">
                {partner.logo && (
                  <AspectRatio ratio={3/1} className="mb-4 bg-blue-950/50 rounded-lg overflow-hidden">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`} 
                      className="object-contain w-full h-full p-2" 
                    />
                  </AspectRatio>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{partner.name}</h3>
                <p className="text-blue-200 text-sm">{partner.address}</p>
              </div>
              <CardFooter className="p-4 pt-0">
                <Button 
                  variant="outline" 
                  className="w-full border-blue-500 text-blue-300 hover:bg-blue-800 group"
                  onClick={() => handleViewOnMap(partner.id)}
                >
                  <MapPin className="mr-2 h-4 w-4 group-hover:text-yellow-400 transition-colors" />
                  Ver no mapa
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
