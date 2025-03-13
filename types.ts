export interface WeatherData {
    coord: {
      lat: number;
      lon: number;
    };
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
      pressure: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
      deg: number;
    };
    name: string;
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
    dt: number;
  }
  
  export interface ForecastData {
    list: {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
      };
      weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[];
      dt_txt: string;
    }[];
    city: {
      name: string;
      country: string;
    };
  }
  
  export interface Coordinates {
    lat: number;
    lng: number;
  }