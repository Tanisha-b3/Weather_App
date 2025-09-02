// utils/weatherUtils.js
import { Cloud, CloudRain, CloudSnow, CloudDrizzle  } from "lucide-react";
export const getWeatherIcon = (weatherCode, size = "h-16 w-16") => {
  if (weatherCode === 0) return <Sun className={`${size} text-yellow-400`} />;
  if (weatherCode >= 1 && weatherCode <= 3) return <Cloud className={`${size} text-gray-400`} />;
  if (weatherCode >= 45 && weatherCode <= 48) return <Cloud className={`${size} text-gray-300`} />;
  if (weatherCode >= 51 && weatherCode <= 67) return <CloudRain className={`${size} text-blue-400`} />;
  if (weatherCode >= 71 && weatherCode <= 77) return <CloudSnow className={`${size} text-blue-200`} />;
  if (weatherCode >= 80 && weatherCode <= 82) return <CloudRain className={`${size} text-blue-500`} />;
  if (weatherCode >= 95 && weatherCode <= 99) return <CloudDrizzle className={`${size} text-purple-500`} />;
  return <Cloud className={`${size} text-gray-400`} />;
};

export const getWeatherDescription = (weatherCode) => {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  return descriptions[weatherCode] || 'Unknown';
};

export const getBackgroundClass = (weatherCode, isDay = true) => {
  if (weatherCode === 0) return isDay ? 'from-blue-400 to-blue-600' : 'from-blue-900 to-indigo-950';
  if (weatherCode >= 1 && weatherCode <= 3) return 'from-blue-300 to-blue-500';
  if (weatherCode >= 45 && weatherCode <= 48) return 'from-gray-400 to-gray-600';
  if (weatherCode >= 51 && weatherCode <= 67) return 'from-blue-500 to-blue-700';
  if (weatherCode >= 71 && weatherCode <= 77) return 'from-blue-200 to-blue-400';
  if (weatherCode >= 80 && weatherCode <= 82) return 'from-blue-600 to-blue-800';
  if (weatherCode >= 95 && weatherCode <= 99) return 'from-purple-600 to-indigo-800';
  return 'from-blue-400 to-blue-600';
};

export const formatLocalTime = (timeString, timezone) => {
  try {
    // Create date object from the API time string
    const date = new Date(timeString);
    
    // Format the date according to the location's timezone
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: timezone,
      hour12: true
    }).format(date);
  } catch (error) {
    console.error("Error formatting time:", error);
    return timeString; // Fallback to original string if formatting fails
  }
};

export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const getUvIndexLevel = (uvIndex) => {
  if (uvIndex <= 2) return { level: 'Low', color: 'text-green-500' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-500' };
  if (uvIndex <= 7) return { level: 'High', color: 'text-orange-500' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-500' };
  return { level: 'Extreme', color: 'text-purple-500' };
};

export const isDayTime = (weatherData) => {
  if (!weatherData || !weatherData.daily) return true;
  
  const now = new Date();
  const sunrise = new Date(weatherData.daily.sunrise[0]);
  const sunset = new Date(weatherData.daily.sunset[0]);
  
  return now >= sunrise && now <= sunset;
};