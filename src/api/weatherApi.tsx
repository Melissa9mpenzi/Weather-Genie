import axios from "axios";
import { WeatherData, ForecastData, Coordinates } from "../types";

// OpenWeatherMap API key
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Base URL for OpenWeatherMap API
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Get current weather data by coordinates
export const getCurrentWeather = async (
  coords: Coordinates
): Promise<WeatherData> => {
  try {
    console.log("Fetching weather with API key:", API_KEY); // Debug log
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: coords.lat,
        lon: coords.lng,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("API Response:", error.response?.data);
      console.log("API Status:", error.response?.status);
    }
    console.log(
      "Error fetching current weather:",
      error instanceof Error ? error.message : String(error)
    );
    throw new Error("Failed to fetch current weather data");
  }
};

// Get 5-day forecast by coordinates
export const getForecast = async (
  coords: Coordinates
): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat: coords.lat,
        lon: coords.lng,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("API Response:", error.response?.data);
      console.log("API Status:", error.response?.status);
    }
    console.log(
      "Error fetching forecast:",
      error instanceof Error ? error.message : String(error)
    );
    throw new Error("Failed to fetch forecast data");
  }
};

// Get weather by city name
export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    console.log("Searching for city:", city); // Debug log
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("API Response:", error.response?.data);
      console.log("API Status:", error.response?.status);
    }
    console.log(
      "Error fetching weather by city:",
      error instanceof Error ? error.message : String(error)
    );
    throw new Error(
      `Could not find weather data for "${city}". Please check the city name and try again.`
    );
  }
};

// Get forecast by city name
export const getForecastByCity = async (
  city: string
): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("API Response:", error.response?.data);
      console.log("API Status:", error.response?.status);
    }
    console.log(
      "Error fetching forecast by city:",
      error instanceof Error ? error.message : String(error)
    );
    throw new Error(`Failed to fetch forecast data for ${city}`);
  }
};
