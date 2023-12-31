export const API_KEY = import.meta.env.VITE_WHEATHER_API_KEY as string;

export interface OpenweatherData {
  base: string;
  name: string;
  order?: number;
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

export type TempScale = "metric" | "imperial" | undefined;

export type StorageLocal = {
  cityList: string[];
  option: {
    tempScale: TempScale;
  };
};
export const fetchRequest = async (
  city: string,
  unit: string
): Promise<Response> => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`;
    const response = await fetch(url);

    if (response.status >= 400 || !response.ok) {
      throw new Error("City is not found");
    }
    // const data: OpenweatherData = await response.json();

    return response;
  } catch (error) {
    chrome.notifications.create("notfoundcity", {
      type: "basic",
      iconUrl: "https://img.icons8.com/emoji/48/warning-emoji.png",
      title: "Warning",
      message: "City not found please try a valid city name",
    });
    throw new Error(error as string);
  }
};
