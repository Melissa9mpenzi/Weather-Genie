import React from 'react';
import { WeatherData } from '../types';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Sunrise, 
  Sunset, 
  Gauge 
} from 'lucide-react';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{weatherData.name}</h2>
          <p className="text-gray-600">{weatherData.sys.country}</p>
        </div>
        <div className="flex flex-col items-center">
          <img 
            src={getWeatherIcon(weatherData.weather[0].icon)} 
            alt={weatherData.weather[0].description}
            className="w-16 h-16"
          />
          <p className="text-gray-700 capitalize">{weatherData.weather[0].description}</p>
        </div>
      </div>
      
      <div className="flex justify-center my-4">
        <span className="text-5xl font-bold text-sky-600">
          {Math.round(weatherData.main.temp)}°C
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center">
          <Thermometer className="text-sky-500 mr-2" size={20} />
          <div>
            <p className="text-gray-500 text-sm">Feels Like</p>
            <p className="font-semibold">{Math.round(weatherData.main.feels_like)}°C</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Droplets className="text-sky-500 mr-2" size={20} />
          <div>
            <p className="text-gray-500 text-sm">Humidity</p>
            <p className="font-semibold">{weatherData.main.humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Wind className="text-sky-500 mr-2" size={20} />
          <div>
            <p className="text-gray-500 text-sm">Wind Speed</p>
            <p className="font-semibold">{weatherData.wind.speed} m/s</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Gauge className="text-sky-500 mr-2" size={20} />
          <div>
            <p className="text-gray-500 text-sm">Pressure</p>
            <p className="font-semibold">{weatherData.main.pressure} hPa</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <Sunrise className="text-amber-500 mr-2" size={18} />
          <div>
            <p className="text-gray-500 text-xs">Sunrise</p>
            <p className="font-medium">{formatTime(weatherData.sys.sunrise)}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Sunset className="text-orange-500 mr-2" size={18} />
          <div>
            <p className="text-gray-500 text-xs">Sunset</p>
            <p className="font-medium">{formatTime(weatherData.sys.sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;