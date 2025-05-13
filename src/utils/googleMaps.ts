
// Google Maps implementation utility

// Initialize the map
export const initGoogleMap = (
  elementId: string,
  center: google.maps.LatLngLiteral,
  zoom: number = 12
): google.maps.Map | null => {
  const mapElement = document.getElementById(elementId);
  if (!mapElement) return null;
  
  // Create a styled map with dark theme
  const map = new google.maps.Map(mapElement, {
    center,
    zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
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
};

// Add a marker to the map
export const addMarker = (
  map: google.maps.Map,
  position: google.maps.LatLngLiteral,
  title: string,
  iconColor: string = "#FACC15" 
): google.maps.Marker => {
  const marker = new google.maps.Marker({
    position,
    map,
    title,
    animation: google.maps.Animation.DROP,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: iconColor,
      fillOpacity: 0.9,
      strokeWeight: 2,
      strokeColor: "#000000",
      scale: 10,
    },
  });

  return marker;
};

// Create an info window for a marker
export const createInfoWindow = (
  content: string
): google.maps.InfoWindow => {
  return new google.maps.InfoWindow({
    content,
    maxWidth: 250,
  });
};
