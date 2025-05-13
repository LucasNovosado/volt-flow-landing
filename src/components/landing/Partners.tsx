
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, ArrowRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [activePartnerId, setActivePartnerId] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Function to initialize the map (will be implemented with MapBox)
  const initMap = () => {
    if (!mapboxToken || !mapContainerRef.current) return;
    
    // This is a placeholder - we'll implement the actual map in the future
    // For now, we'll show a message asking users to enter their MapBox token
    console.log('Map would initialize with token:', mapboxToken);
  };

  // Load map when token is available
  useEffect(() => {
    if (mapboxToken) {
      initMap();
    }
  }, [mapboxToken]);
  
  // Animation setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate the section title
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
      
      // Animate the cards with staggered effect
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
      
      // Animate the map
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
      
      // Energy pulse animation for the map pointers
      gsap.to('.map-pointer', {
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'sine.inOut'
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  // Handle clicking "View on map" button
  const handleViewOnMap = (id: string) => {
    setActivePartnerId(id);
    // Would also pan the map to show the marker
    const element = document.getElementById(`map-marker-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        </div>
        
        {/* Map Section */}
        <div className="mb-16 rounded-2xl overflow-hidden map-container h-[400px] bg-blue-950 border border-blue-800/30 relative">
          {mapboxToken ? (
            <div ref={mapContainerRef} className="w-full h-full bg-blue-950">
              {/* Interactive Map will be rendered here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-blue-300">Carregando mapa...</p>
              </div>
              
              {/* Sample Map Markers (would be dynamic) */}
              {partners.map((partner) => (
                <div 
                  id={`map-marker-${partner.id}`}
                  key={`marker-${partner.id}`}
                  className={`map-pointer absolute w-6 h-6 rounded-full bg-yellow-400 border-2 border-black shadow-lg cursor-pointer ${activePartnerId === partner.id ? 'ring-2 ring-white' : ''}`}
                  style={{
                    left: `${30 + Math.random() * 60}%`, 
                    top: `${20 + Math.random() * 60}%`
                  }}
                >
                  <Popover>
                    <PopoverTrigger>
                      <span className="sr-only">{partner.name}</span>
                    </PopoverTrigger>
                    <PopoverContent className="bg-blue-900 text-white border-blue-700 p-3 w-64">
                      <div className="flex flex-col gap-2">
                        <h4 className="font-bold text-lg">{partner.name}</h4>
                        <p className="text-sm text-blue-200">{partner.address}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                          onClick={() => window.open(partner.googleMapsUrl, '_blank')}
                        >
                          Abrir no Google Maps
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col gap-4 p-6">
              <p className="text-blue-300 max-w-lg text-center">
                Para visualizar o mapa interativo, você precisa inserir sua chave pública do MapBox.
                Crie uma conta no <a href="https://mapbox.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">Mapbox</a> e insira sua chave pública abaixo:
              </p>
              <input 
                type="text" 
                placeholder="Chave pública do MapBox" 
                className="w-full max-w-md p-2 rounded border border-blue-700 bg-blue-900 text-white"
                onChange={(e) => setMapboxToken(e.target.value)}
                value={mapboxToken}
              />
              <Button 
                onClick={initMap}
                className="bg-blue-600 hover:bg-blue-500"
              >
                Carregar Mapa
              </Button>
            </div>
          )}
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
