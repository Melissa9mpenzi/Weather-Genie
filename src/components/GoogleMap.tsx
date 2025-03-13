import React from "react";
import { Coordinates } from "../../types";
import { MapPin } from "lucide-react";

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

const GoogleMapComponent: React.FC<MapProps> = ({ center, onMapClick }) => {
  // Check if API key is available
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const hasValidApiKey = apiKey && apiKey !== "your_google_maps_key_here";

  // Uganda's coordinates (approximate center)
  const ugandaCoordinates = { lat: 1.3733, lng: 32.2903 };

  // Handle click on the static map
  const handleStaticMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Use Uganda's coordinates as a fallback
    onMapClick(ugandaCoordinates);
  };

  // Open Google Maps in a new tab
  const openGoogleMaps = () => {
    window.open("https://maps.app.goo.gl/atoXBDn16uT2jg268", "_blank");
  };

  if (!hasValidApiKey) {
    return (
      <div className="rounded-xl overflow-hidden shadow-lg bg-white h-96 flex flex-col items-center justify-center">
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={handleStaticMapClick}
        >
          {/* Embedded Google Maps iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35853743783!2d32.44882770753056!3d0.3474755438245432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc0f8c4119f7%3A0x859738cc392e7527!2sKampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1710361234567!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map of Kampala, Uganda"
          ></iframe>

          {/* Overlay with location info */}
          <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md">
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

          {/* Instructions overlay */}
          <div className="absolute top-4 left-4 bg-white/80 p-2 rounded shadow-sm">
            <p className="text-xs text-gray-700">
              Click anywhere on the map to get weather data
            </p>
          </div>

          {/* View on Google Maps button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openGoogleMaps();
              }}
              className="bg-white text-sky-600 px-3 py-1 rounded-full text-xs font-medium shadow-sm hover:bg-sky-50 transition-colors"
            >
              View on Google Maps
            </button>
          </div>
        </div>
      </div>
    );
  }

  // This code will only run if a valid API key is provided
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100 h-96 flex items-center justify-center">
      <div className="text-center p-6">
        <p className="text-gray-600 font-medium mb-2">
          Google Maps API key detected
        </p>
        <p className="text-gray-500 text-sm">
          The map would load here if the API key was active.
        </p>
      </div>
    </div>
  );
};

export default GoogleMapComponent;

// const { isLoaded, loadError } = useJsApiLoader({
//   id: 'google-map-script',
//   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'
// });
