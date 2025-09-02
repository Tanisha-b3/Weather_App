// hooks/useWeather.js
import { useState, useEffect } from 'react';

export const useWeather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

 
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentWeatherSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem('recentWeatherSearches', JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  const fetchWeatherData = async (searchCity = city) => {
    if (!searchCity.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // First, get coordinates from city name
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchCity)}&count=1`
      );
      const geoData = await geoResponse.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }
      
      const { latitude, longitude, name, country, timezone, admin1 } = geoData.results[0];
      
      // Then, get weather data using coordinates
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,weathercode,windspeed_10m,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&timezone=${timezone}`
      );
      const weatherData = await weatherResponse.json();
      
      setWeatherData({
        city: name,
        region: admin1,
        country,
        latitude,
        longitude,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        winddirection: weatherData.current_weather.winddirection,
        weathercode: weatherData.current_weather.weathercode,
        time: weatherData.current_weather.time,
        timezone: timezone,
        humidity: weatherData.hourly.relativehumidity_2m[0],
        visibility: weatherData.hourly.visibility[0],
        hourly: weatherData.hourly,
        daily: weatherData.daily,
      });

      setForecastData({
        hourly: weatherData.hourly,
        daily: weatherData.daily
      });

      // Add to recent searches
      const newSearch = { city: name, country, time: new Date().toISOString() };
      setRecentSearches(prev => {
        const filtered = prev.filter(item => item.city !== name);
        return [newSearch, ...filtered.slice(0, 4)];
      });
      
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentSearchClick = (recentCity) => {
    setCity(recentCity);
    fetchWeatherData(recentCity);
  };

  const handleRefresh = () => {
    if (weatherData) {
      fetchWeatherData(weatherData.city);
    }
  };
console.log(city)
  return {
    city,
    setCity,
    weatherData,
    forecastData,
    loading,
    error,
    recentSearches,
    lastUpdated,
    fetchWeatherData,
    handleRecentSearchClick,
    handleRefresh
  };
};