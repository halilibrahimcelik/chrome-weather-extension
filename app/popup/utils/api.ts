export const API_KEY = import.meta.env.VITE_WHEATHER_API_KEY as string;

export const fetchRequest = async (city: string): Promise<any> => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);

    if (response.status >= 400 || !response.ok) {
      throw new Error("City is not found");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
