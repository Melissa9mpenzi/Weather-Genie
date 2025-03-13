# Weather Genie

A beautiful weather application with Google Maps integration that allows users to check current weather conditions and forecasts for any location.

## Features

- Current weather display with detailed information
- 5-day weather forecast
- Interactive Google Maps integration
- Location search by city name
- Automatic geolocation detection
- Responsive design for all devices

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory based on `.env.example`:
   ```
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```
   - Get an OpenWeatherMap API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Get a Google Maps API key from [Google Cloud Console](https://developers.google.com/maps/documentation/javascript/get-api-key)

4. Start the development server:
   ```
   npm run dev
   ```

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Axios for API requests
- Google Maps API
- OpenWeatherMap API

## Building for Production

To build the app for production:

```
npm run build
```

The built files will be in the `dist` directory.

## License

MIT