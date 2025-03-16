import React, { useState, useEffect } from "react";
import { Cloud, MapPin, AlertCircle } from "lucide-react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";
import MapTilerMap from "./GoogleMap";
import {
  getCurrentWeather,
  getForecast,
  getWeatherByCity,
  getForecastByCity,
} from "../api/weatherApi";
import { WeatherData, ForecastData, Coordinates } from "../types";

const WeatherGenie: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 40.7128,
    lng: -74.006,
  }); // Default to New York
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState<boolean>(false);

  // Check if API keys are set
  useEffect(() => {
    const openWeatherKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const mapTilerKey = import.meta.env.VITE_MAPTILER_API_KEY;

    if (
      !openWeatherKey ||
      openWeatherKey === "YOUR_OPENWEATHERMAP_API_KEY" ||
      !mapTilerKey ||
      mapTilerKey === "YOUR_MAPTILER_API_KEY"
    ) {
      setApiKeyMissing(true);
    }
  }, []);

  // Fetch weather data based on coordinates
  const fetchWeatherData = async (coords: Coordinates) => {
    if (apiKeyMissing) return;

    try {
      setLoading(true);
      setError(null);

      // Use Promise.allSettled instead of Promise.all to handle individual promise rejections
      const results = await Promise.allSettled([
        getCurrentWeather(coords),
        getForecast(coords),
      ]);

      if (results[0].status === "fulfilled") {
        setWeatherData(results[0].value);
      } else {
        console.log("Weather fetch failed:", results[0].reason);
        setError("Failed to fetch current weather data.");
      }

      if (results[1].status === "fulfilled") {
        setForecastData(results[1].value);
      } else {
        console.log("Forecast fetch failed:", results[1].reason);
        if (!error) setError("Failed to fetch forecast data.");
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.log(
        "Error in fetchWeatherData:",
        err instanceof Error ? err.message : String(err)
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle city search
  const handleCitySearch = async (city: string) => {
    if (apiKeyMissing) return;

    try {
      setLoading(true);
      setError(null);

      try {
        const weather = await getWeatherByCity(city);
        setWeatherData(weather);
        // Check if coord exists in the response
        if (weather && weather.coord) {
          setCoordinates({ lat: weather.coord.lat, lng: weather.coord.lon });
        } else {
          console.log("Weather data missing coordinates:", weather);
          // Use a default fallback or keep current coordinates
        }
      } catch (weatherErr) {
        console.log(
          "Weather by city fetch failed:",
          weatherErr instanceof Error ? weatherErr.message : String(weatherErr)
        );
        setError(
          `Could not find weather data for "${city}". Please check the city name and try again.`
        );
        setLoading(false);
        return;
      }

      try {
        const forecast = await getForecastByCity(city);
        setForecastData(forecast);
      } catch (forecastErr) {
        console.log(
          "Forecast by city fetch failed:",
          forecastErr instanceof Error
            ? forecastErr.message
            : String(forecastErr)
        );
        if (!error)
          setError("Found the city but failed to fetch forecast data.");
      }
    } catch (err) {
      setError(
        `Could not find weather data for "${city}". Please check the city name and try again.`
      );
      console.log(
        "Error in handleCitySearch:",
        err instanceof Error ? err.message : String(err)
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle map click
  const handleMapClick = (coords: Coordinates) => {
    if (apiKeyMissing) return;
    setCoordinates(coords);
    fetchWeatherData(coords);
  };

  // Get user's location on initial load
  useEffect(() => {
    if (apiKeyMissing) {
      setLoading(false);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(userCoords);
          fetchWeatherData(userCoords);
        },
        () => {
          // If user denies location permission, use default coordinates
          fetchWeatherData(coordinates);
        }
      );
    } else {
      // If geolocation is not supported, use default coordinates
      fetchWeatherData(coordinates);
    }
  }, [apiKeyMissing]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center mb-2">
            <Cloud className="text-sky-500 mr-2" size={32} />
            <h1 className="text-3xl font-bold text-sky-700">Weather Genie</h1>
          </div>
          <p className="text-gray-600 mb-6">Your magical weather companion</p>
          <SearchBar onSearch={handleCitySearch} />
        </header>

        {apiKeyMissing && (
          <div className="bg-amber-100 border border-amber-200 text-amber-800 px-6 py-4 rounded-lg mb-6 max-w-2xl mx-auto">
            <div className="flex items-start">
              <AlertCircle
                className="text-amber-500 mr-3 mt-0.5 flex-shrink-0"
                size={20}
              />
              <div>
                <h3 className="font-bold mb-1">API Keys Required</h3>
                <p className="mb-2">
                  To use Weather Genie, you need to set up API keys:
                </p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Create a{" "}
                    <a
                      href="https://openweathermap.org/api"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-700 underline"
                    >
                      OpenWeatherMap API key
                    </a>
                  </li>
                  <li>
                    Create a{" "}
                    <a
                      href="https://cloud.maptiler.com/account/keys/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-700 underline"
                    >
                      MapTiler API key
                    </a>
                  </li>
                  <li>
                    Create a{" "}
                    <code className="bg-amber-50 px-1 py-0.5 rounded">
                      .env
                    </code>{" "}
                    file in the project root with:
                    <pre className="bg-amber-50 p-2 rounded mt-1 text-sm overflow-x-auto">
                      VITE_OPENWEATHER_API_KEY=your_openweather_key_here
                      <br />
                      VITE_MAPTILER_API_KEY=your_maptiler_key_here
                    </pre>
                  </li>
                  <li>Restart the development server</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              {weatherData && (
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="text-sky-500 mr-1" size={16} />
                  <p className="text-gray-600">
                    {weatherData.name}, {weatherData.sys.country}
                  </p>
                </div>
              )}
              {weatherData && <WeatherCard weatherData={weatherData} />}
              {forecastData && <ForecastCard forecastData={forecastData} />}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Select Location on Map
              </h2>
              <MapTilerMap center={coordinates} onMapClick={handleMapClick} />
              <p className="text-sm text-gray-500 mt-2">
                Click anywhere on the map to get weather information for that
                location.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherGenie;
