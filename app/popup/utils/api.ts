import { useMainContext } from "../context/MainContext";

export const API_KEY = import.meta.env.VITE_WHEATHER_API_KEY as string;

export interface OpenweatherData {
  base: string;
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  visibility: number;
  timezone: number;
  id: number;
  cod: number;
}
export const fetchRequest = async (city: string): Promise<Response> => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (response.status >= 400 || !response.ok) {
      throw new Error("City is not found");
    }
    // const data: OpenweatherData = await response.json();

    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};
