import React, { useEffect, useRef } from "react";
import { Coordinates } from "../../types";
import { MapPin } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapProps {
  center: Coordinates;
  onMapClick: (coords: Coordinates) => void;
}

// Add type declaration for import.meta.env
declare global {
  interface ImportMeta {
    env: Record<string, string>;
  }
}

const MapTilerMap: React.FC<MapProps> = ({ center, onMapClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  useEffect(() => {
    if (!mapContainer.current) return;

    const initializeMap = async () => {
      // Dynamically import maplibre-gl to avoid SSR issues
      const maplibregl = await import("maplibre-gl");

      if (mapRef.current) return;

      mapRef.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
        center: [center.lng, center.lat],
        zoom: 10,
      });

      // Add navigation control
      mapRef.current.addControl(new maplibregl.NavigationControl());

      // Add marker at center
      markerRef.current = new maplibregl.Marker({ color: "#0ea5e9" })
        .setLngLat([center.lng, center.lat])
        .addTo(mapRef.current);

      // Add click event
      mapRef.current.on("click", (e: any) => {
        const { lng, lat } = e.lngLat;
        onMapClick({ lat, lng });

        // Update marker position
        if (markerRef.current) {
          markerRef.current.setLngLat([lng, lat]);
        }
      });
    };

    initializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update marker position when center changes
  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      markerRef.current.setLngLat([center.lng, center.lat]);
      mapRef.current.flyTo({
        center: [center.lng, center.lat],
        essential: true,
      });
    }
  }, [center]);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white h-96">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md z-10">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Current Location:
        </p>
        <div className="flex items-center gap-2">
          <MapPin className="text-sky-500" size={16} />
          <p className="text-sky-800 text-sm">
            {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapTilerMap;
