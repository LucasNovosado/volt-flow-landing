
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize map placeholder function that Google Maps API will call
window.initMap = function() {
  console.log('Google Maps API loaded');
};

// Render the app
createRoot(document.getElementById("root")!).render(<App />);
