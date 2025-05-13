
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Load Google Maps script
const loadGoogleMapsScript = () => {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap&libraries=maps,marker&v=weekly`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

// Initialize map placeholder function that Google Maps API will call
window.initMap = function() {
  console.log('Google Maps API loaded');
};

// Load Google Maps script
loadGoogleMapsScript();

// Render the app
createRoot(document.getElementById("root")!).render(<App />);
