// Google Maps implementation utility

// Variable to track if script is already being loaded
let isLoadingScript = false;
let loadedScriptElement: HTMLScriptElement | null = null;

// Get API key from environment variables
const getApiKey = (): string => {
  return import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
};

// Initialize the map
export const initGoogleMap = (
  elementId: string,
  center: { lat: number; lng: number },
  zoom: number = 12
): google.maps.Map | null => {
  const mapElement = document.getElementById(elementId);
  if (!mapElement || !window.google || !window.google.maps) return null;
  
  try {
    // Create a styled map with dark theme
    const map = new window.google.maps.Map(mapElement, {
      center,
      zoom,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: true,
    });

    return map;
  } catch (error) {
    console.error("Error initializing map:", error);
    return null;
  }
};

// Add a marker to the map
export const addMarker = (
  map: any,
  position: { lat: number; lng: number },
  title: string,
  iconColor: string = "#FACC15" 
): any => {
  if (!window.google || !window.google.maps) return null;
  
  try {
    const marker = new window.google.maps.Marker({
      position,
      map,
      title,
      animation: window.google.maps.Animation.DROP,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: iconColor,
        fillOpacity: 0.9,
        strokeWeight: 2,
        strokeColor: "#000000",
        scale: 10,
      },
    });

    return marker;
  } catch (error) {
    console.error("Error creating marker:", error);
    return null;
  }
};

// Create an info window for a marker
export const createInfoWindow = (
  content: string
): any => {
  if (!window.google || !window.google.maps) {
    // Return a mock InfoWindow if Google Maps is not loaded
    return {
      open: () => {},
      close: () => {},
      setContent: () => {}
    };
  }
  
  return new window.google.maps.InfoWindow({
    content,
    maxWidth: 250,
  });
};

// Safe cleanup function for Google Maps elements
export const cleanupGoogleMaps = (
  markers: Map<string, any> | null,
  infoWindow: any | null
): void => {
  // Clean up markers
  if (markers) {
    markers.forEach(marker => {
      if (marker) {
        // Remove all event listeners
        if (window.google && window.google.maps && window.google.maps.event) {
          window.google.maps.event.clearInstanceListeners(marker);
        }
        // Remove marker from map
        marker.setMap(null);
      }
    });
  }
  
  // Close info window
  if (infoWindow) {
    infoWindow.close();
  }
};

// Load Google Maps script safely
export const loadGoogleMapsScript = (
  callbackName: string
): HTMLScriptElement | null => {
  // Check if we have an API key
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn('Google Maps API key not found. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file');
    return null;
  }

  // Only load if not already loaded or loading
  if (window.google && window.google.maps) {
    return null;
  }
  
  if (isLoadingScript) {
    return loadedScriptElement;
  }
  
  // Set loading flag
  isLoadingScript = true;
  
  // Create new script element
  const script = document.createElement('script');
  script.id = `google-maps-script-${Date.now()}`;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`;
  script.async = true;
  script.defer = true;
  
  // Add error handler
  script.onerror = () => {
    console.error('Failed to load Google Maps script');
    isLoadingScript = false;
    loadedScriptElement = null;
  };
  
  // Store reference to script element
  loadedScriptElement = script;
  
  // Add script to document
  document.head.appendChild(script);
  return script;
};

// Remove script element safely and reset loading state
export const removeGoogleMapsScript = (script: HTMLScriptElement | null): void => {
  if (!script) return;
  
  try {
    // Only remove if script exists and is actually in the document
    if (script.parentNode && document.head.contains(script)) {
      script.parentNode.removeChild(script);
    }
  } catch (error) {
    console.warn("Error removing Google Maps script:", error);
  } finally {
    // Reset loading state
    isLoadingScript = false;
    loadedScriptElement = null;
  }
};

// Check if Google Maps is loaded
export const isGoogleMapsLoaded = (): boolean => {
  return !!(window.google && window.google.maps);
};