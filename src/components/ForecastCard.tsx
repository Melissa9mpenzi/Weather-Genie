import React from 'react';
import { ForecastData } from '../types';

interface ForecastCardProps {
  forecastData: ForecastData;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;

  // Group forecast data by day
  const groupedForecast = forecastData.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof forecastData.list>);

  // Get daily forecasts (using noon data or closest to it)
  const dailyForecasts = Object.keys(groupedForecast).map(date => {
    const dayData = groupedForecast[date];
    // Find forecast closest to noon
    const noonForecast = dayData.reduce((prev, curr) => {
      const prevHour = new Date(prev.dt * 1000).getHours();
      const currHour = new Date(curr.dt * 1000).getHours();
      return Math.abs(currHour - 12) < Math.abs(prevHour - 12) ? curr : prev;
    });
    return noonForecast;
  }).slice(0, 5); // Limit to 5 days

  const formatDay = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
  };

  // const getWeatherIcon = (iconCode: string) => {
  //   return `https://openweathermap.org/img/wn/${iconCode}.png`;
  // };


  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-5 gap-2">
        {dailyForecasts.map((forecast, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="text-sm font-medium text-gray-700">{formatDay(forecast.dt)}</p>
            <img 
              src={getWeatherIcon(forecast.weather[0].icon)} 
              alt={forecast.weather[0].description}
              className="w-10 h-10 my-1"
            />
            <p className="text-sm font-bold text-sky-600">{Math.round(forecast.main.temp)}°C</p>
            <p className="text-xs text-gray-500 capitalize truncate">{forecast.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;




// const groupedForecast = forecastData.list.reduce((acc, item) => {
//   const date = new Date(item.dt * 1000).toLocaleDateString();
//   if (!acc[date]) {
//     acc[date] = [];
//   }
//   acc[date].push(item);
//   return acc;
// }, {} as Record<string, typeof forecastData.list[0][]>);