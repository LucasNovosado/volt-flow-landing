
/// <reference types="vite/client" />

// Global Google Maps types
interface Window {
  google: any;
  initMap: () => void;
}

// Mock types for Google Maps when not available
declare namespace google {
  namespace maps {
    class Map {
      constructor(element: HTMLElement, options: MapOptions);
      panTo(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      getCenter(): LatLng;
      getZoom(): number;
    }
    
    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
      getPosition(): LatLng | null;
      addListener(event: string, handler: Function): MapsEventListener;
      setAnimation(animation: any): void;
    }
    
    class InfoWindow {
      constructor(options?: InfoWindowOptions);
      open(map?: Map, anchor?: Marker): void;
      close(): void;
      setContent(content: string | Element): void;
    }
    
    interface MapsEventListener {
      remove(): void;
    }
    
    interface MapOptions {
      center: LatLngLiteral;
      zoom: number;
      mapTypeId?: string;
      styles?: any[];
      disableDefaultUI?: boolean;
      zoomControl?: boolean;
      fullscreenControl?: boolean;
    }
    
    interface MarkerOptions {
      position: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      animation?: any;
      icon?: any;
    }
    
    interface InfoWindowOptions {
      content?: string | Element;
      maxWidth?: number;
    }
    
    interface LatLng {
      lat(): number;
      lng(): number;
      equals(other: LatLng): boolean;
      toString(): string;
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    
    const Animation: {
      BOUNCE: number;
      DROP: number;
    };
    
    const MapTypeId: {
      ROADMAP: string;
      SATELLITE: string;
      HYBRID: string;
      TERRAIN: string;
    };
    
    const SymbolPath: {
      CIRCLE: number;
      FORWARD_CLOSED_ARROW: number;
      FORWARD_OPEN_ARROW: number;
      BACKWARD_CLOSED_ARROW: number;
      BACKWARD_OPEN_ARROW: number;
    };
    
    namespace event {
      function trigger(instance: any, eventName: string, ...args: any[]): void;
    }
  }
}
