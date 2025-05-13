
declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    panTo(latLng: LatLng | LatLngLiteral): void;
    getPosition(): LatLng | null;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
    setPosition(latLng: LatLng | LatLngLiteral): void;
    getPosition(): LatLng | null;
    addListener(eventName: string, handler: (...args: any[]) => void): MapsEventListener;
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(map?: Map, anchor?: Marker): void;
    close(): void;
    setContent(content: string | Node): void;
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
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
    content?: string | Node;
    maxWidth?: number;
  }

  interface LatLng {
    lat(): number;
    lng(): number;
    toString(): string;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapsEventListener {
    remove(): void;
  }

  const SymbolPath: {
    CIRCLE: number;
  };

  const Animation: {
    DROP: number;
  };

  const MapTypeId: {
    ROADMAP: string;
  };

  namespace event {
    function trigger(instance: any, eventName: string, ...args: any[]): void;
  }
}

export {};
