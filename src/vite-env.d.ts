
/// <reference types="vite/client" />

// Global Google Maps types
interface Window {
  google: typeof google;
  initMap: () => void;
}
