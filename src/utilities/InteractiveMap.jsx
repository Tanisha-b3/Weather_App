// components/weather/InteractiveMap.jsx
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Thermometer, Droplets, Wind, Navigation, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom weather icons
const weatherIcons = {
  clear: new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/6974/6974833.png',
    iconSize: [30, 30],
  }),
  cloudy: new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/414/414927.png',
    iconSize: [30, 30],
  }),
  rainy: new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3351/3351979.png',
    iconSize: [30, 30],
  }),
  snowy: new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2315/2315309.png',
    iconSize: [30, 30],
  }),
  stormy: new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1959/1959338.png',
    iconSize: [30, 30],
  }),
  default: new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/984/984503.png',
    iconSize: [30, 30],
  }),
};

const getWeatherIcon = (weatherCode) => {
  if (weatherCode === 0) return weatherIcons.clear;
  if (weatherCode >= 1 && weatherCode <= 3) return weatherIcons.cloudy;
  if (weatherCode >= 45 && weatherCode <= 67) return weatherIcons.rainy;
  if (weatherCode >= 71 && weatherCode <= 77) return weatherIcons.snowy;
  if (weatherCode >= 80 && weatherCode <= 99) return weatherIcons.stormy;
  return weatherIcons.default;
};

const InteractiveMap = ({ weatherData, onCitySelect }) => {
  const [map, setMap] = useState(null);
  const [nearbyCities, setNearbyCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch nearby cities when weatherData changes
  useEffect(() => {
    if (weatherData && navigator.geolocation) {
      setLoading(true);
      fetchNearbyCities(weatherData.city);
    }
  }, [weatherData]);

  const fetchNearbyCities = async (cityName) => {
    try {
      // First get coordinates of the current city
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`
      );
      const geoData = await geoResponse.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        setLoading(false);
        return;
      }
      
      const { latitude, longitude } = geoData.results[0];
      
      // Get nearby cities (simulated - in a real app you'd use a proper geocoding API)
      const nearby = await simulateNearbyCities(latitude, longitude);
      setNearbyCities(nearby);
      
      // Center map on current location
      if (map) {
        map.setView([latitude, longitude], 8);
      }
    } catch (error) {
      console.error('Error fetching nearby cities:', error);
    } finally {
      setLoading(false);
    }
  };

  // Simulate fetching nearby cities (in a real app, you'd use a proper API)
  const simulateNearbyCities = async (lat, lng) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate some mock nearby locations with random weather data
    const cities = [];
    for (let i = 0; i < 6; i++) {
      const offsetLat = (Math.random() - 0.5) * 2;
      const offsetLng = (Math.random() - 0.5) * 2;
      
      cities.push({
        id: i,
        name: `Nearby City ${i + 1}`,
        latitude: lat + offsetLat,
        longitude: lng + offsetLng,
        temperature: Math.round(weatherData.temperature + (Math.random() - 0.5) * 5),
        weathercode: [0, 1, 2, 3, 45, 61, 80][Math.floor(Math.random() * 7)],
        humidity: Math.min(100, Math.max(40, weatherData.humidity + (Math.random() - 0.5) * 20)),
        windspeed: Math.max(0, weatherData.windspeed + (Math.random() - 0.5) * 10),
      });
    }
    
    return cities;
  };

  const handleCityClick = (city) => {
    if (onCitySelect) {
      onCitySelect(city.name);
    }
  };

  if (!weatherData) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
        <CardHeader>
          <CardTitle className="text-lg">Weather Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white/5 rounded-lg h-48 flex items-center justify-center">
            <p className="text-white/70">Search for a city to view the map</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Interactive Weather Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-48 flex items-center justify-center">
            <Skeleton className="h-8 w-8 rounded-full bg-white/20 mx-auto" />
            <p className="text-white/70 ml-2">Loading map data...</p>
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden h-48">
            <MapContainer
              center={[weatherData.latitude || 0, weatherData.longitude || 0]}
              zoom={8}
              style={{ height: '100%', width: '100%' }}
              whenCreated={setMap}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Current location marker */}
              {weatherData.latitude && weatherData.longitude && (
                <Marker
                  position={[weatherData.latitude, weatherData.longitude]}
                  icon={getWeatherIcon(weatherData.weathercode)}
                >
                  <Popup>
                    <div className="text-gray-800">
                      <h3 className="font-bold">{weatherData.city}</h3>
                      <p>Temperature: {weatherData.temperature}°C</p>
                      <p>Condition: {getWeatherDescription(weatherData.weathercode)}</p>
                    </div>
                  </Popup>
                </Marker>
              )}
              
              {/* Nearby cities markers */}
              {nearbyCities.map(city => (
                <Marker
                  key={city.id}
                  position={[city.latitude, city.longitude]}
                  icon={getWeatherIcon(city.weathercode)}
                  eventHandlers={{
                    click: () => handleCityClick(city),
                  }}
                >
                  <Popup>
                    <div className="text-gray-800">
                      <h3 className="font-bold">{city.name}</h3>
                      <div className="flex items-center mt-1">
                        <Thermometer className="h-4 w-4 mr-1" />
                        <span>{city.temperature}°C</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Droplets className="h-4 w-4 mr-1" />
                        <span>{city.humidity}% humidity</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Wind className="h-4 w-4 mr-1" />
                        <span>{city.windspeed} km/h</span>
                      </div>
                      <button 
                        className="mt-2 text-blue-600 text-sm flex items-center"
                        onClick={() => handleCityClick(city)}
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        View weather details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              {/* Temperature gradient circle */}
              {weatherData.latitude && weatherData.longitude && (
                <Circle
                  center={[weatherData.latitude, weatherData.longitude]}
                  radius={20000}
                  pathOptions={{
                    fillColor: weatherData.temperature > 25 ? '#ff6b6b' : 
                              weatherData.temperature > 15 ? '#ffa726' : '#42a5f5',
                    fillOpacity: 0.2,
                    color: 'transparent',
                  }}
                />
              )}
            </MapContainer>
          </div>
        )}
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
            <span>Cool (&lt;15°C)</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-orange-400 mr-1"></div>
            <span>Mild (15-25°C)</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
            <span>Warm (&gt;25°C)</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-white/20 mr-1"></div>
            <span>Temperature gradient</span>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-white/70">
          <p>Click on map markers to view weather details for nearby locations</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get weather description
const getWeatherDescription = (weatherCode) => {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    80: 'Rain showers',
    81: 'Rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm',
    99: 'Thunderstorm'
  };
  return descriptions[weatherCode] || 'Unknown';
};

export default InteractiveMap;