const API_KEY = '796594e8642f21886b7e2e091d782539';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  city: string;
}

export const getWeather = async (latitude: number, longitude: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        // Fallback to Buea, Cameroon coordinates if geolocation fails
        resolve({
          latitude: 4.1557,  // Buea latitude
          longitude: 9.2417  // Buea longitude
        });
      },
      options
    );
  });
}; 