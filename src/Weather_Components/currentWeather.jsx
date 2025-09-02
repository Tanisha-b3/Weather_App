
import { MapPin, Wind, Droplets, Eye, Gauge, Compass, Sunrise, Sunset } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { getWeatherIcon, getWeatherDescription, formatLocalTime, getWindDirection } from '../utilities/WeatherUtility.jsx';

const CurrentWeather = ({ weatherData, lastUpdated }) => {
  if (!weatherData) return null;

  return (
    <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              {weatherData.city}{weatherData.region && `, ${weatherData.region}`}, {weatherData.country}
            </CardTitle>
            <CardDescription className="text-blue-100">
              {formatLocalTime(weatherData.time, weatherData.timezone)}
            </CardDescription>
          </div>
          {lastUpdated && (
            <Badge variant="outline" className="bg-white/20">
              Updated: {lastUpdated.toLocaleTimeString()}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="flex justify-center">
              {getWeatherIcon(weatherData.weathercode, "h-24 w-24")}
            </div>
            
            <p className="text-xl font-medium mt-2">
              {getWeatherDescription(weatherData.weathercode)}
            </p>
            
            <div className="mt-4">
              <p className="text-6xl font-bold">
                {weatherData.temperature}°C
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Wind className="h-6 w-6 mx-auto mb-1" />
              <p className="text-sm">Wind Speed</p>
              <p className="text-xl font-semibold">{weatherData.windspeed} km/h</p>
              <p className="text-xs mt-1">
                <Compass className="h-3 w-3 inline mr-1" />
                {getWindDirection(weatherData.winddirection)}
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Droplets className="h-6 w-6 mx-auto mb-1" />
              <p className="text-sm">Humidity</p>
              <p className="text-xl font-semibold">{weatherData.humidity}%</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Eye className="h-6 w-6 mx-auto mb-1" />
              <p className="text-sm">Visibility</p>
              <p className="text-xl font-semibold">{weatherData.visibility / 1000} km</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Gauge className="h-6 w-6 mx-auto mb-1" />
              <p className="text-sm">Pressure</p>
              <p className="text-xl font-semibold">1013 hPa</p>
            </div>
          </div>
        </div>

        {weatherData.daily && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-3 flex items-center">
              <Sunrise className="h-5 w-5 mr-2" />
              <div>
                <p className="text-sm">Sunrise</p>
                <p className="font-semibold">
                  {new Date(weatherData.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 flex items-center">
              <Sunset className="h-5 w-5 mr-2" />
              <div>
                <p className="text-sm">Sunset</p>
                <p className="font-semibold">
                  {new Date(weatherData.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;