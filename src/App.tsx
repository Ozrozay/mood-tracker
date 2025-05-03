import { useState, useEffect } from 'react'
import './App.css'
import MoodEntry from './components/MoodEntry'
import MoodHistory from './components/MoodHistory'
import MoodPet from './components/MoodPet'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { getWeather, getCurrentLocation, WeatherData } from './services/weatherService'

interface MoodEntryType {
  id: string;
  date: string;
  mood: string;
  note: string;
  weather?: WeatherData;
}

function AppContent() {
  const [entries, setEntries] = useState<MoodEntryType[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const { theme, toggleTheme, setTheme } = useTheme();

  const fetchWeather = async () => {
    try {
      setIsLoadingWeather(true);
      setWeatherError(null);
      const location = await getCurrentLocation();
      const weatherData = await getWeather(location.latitude, location.longitude);
      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeatherError('Unable to fetch weather data. Please try again.');
    } finally {
      setIsLoadingWeather(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveMood = (mood: string, note: string) => {
    const newEntry: MoodEntryType = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood,
      note,
      weather: weather || undefined,
    };
    setEntries([newEntry, ...entries]);
  };

  return (
    <div className="app">
      <header>
        <h1>Mood Tracker</h1>
        <div className="theme-controls">
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
          <button onClick={() => setTheme('zen')} className="theme-toggle">
            🧘
          </button>
        </div>
      </header>
      <main>
        <div className="top-section">
          <MoodPet entries={entries} />
          <div className="weather-widget">
            {isLoadingWeather ? (
              <div className="weather-loading">
                <span>Loading weather...</span>
              </div>
            ) : weatherError ? (
              <div className="weather-error">
                <span>{weatherError}</span>
                <button onClick={fetchWeather} className="refresh-button">
                  🔄 Refresh
                </button>
              </div>
            ) : weather ? (
              <>
                <img 
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.description}
                />
                <div className="weather-info">
                  <span className="temperature">{weather.temperature}°C</span>
                  <span className="description">{weather.description}</span>
                  <span className="city">{weather.city}</span>
                </div>
                <button onClick={fetchWeather} className="refresh-button">
                  🔄
                </button>
              </>
            ) : null}
          </div>
        </div>
        <MoodEntry onSave={handleSaveMood} />
        <MoodHistory entries={entries} />
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App
