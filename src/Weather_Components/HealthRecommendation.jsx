// components/weather/HealthRecommendations.jsx
import { Thermometer, Droplets, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const HealthRecommendations = ({ weatherData, forecastData }) => {
  if (!weatherData) return null;

  const getTempAdvice = (temp) => {
    if (temp > 35) return { text: "Extreme heat! Stay indoors, hydrate frequently, and avoid direct sunlight.", color: "text-red-400" };
    if (temp > 30) return { text: "Hot weather. Drink water often and limit outdoor exposure.", color: "text-orange-400" };
    if (temp < 5) return { text: "Freezing cold. Dress in warm layers to avoid hypothermia.", color: "text-blue-400" };
    if (temp < 10) return { text: "Chilly weather. Keep warm with jackets and scarves.", color: "text-sky-400" };
    return { text: "Comfortable temperature for outdoor activities.", color: "text-green-400" };
  };

  const getHumidityAdvice = (humidity) => {
    if (humidity > 80) return { text: "Very humid — may cause discomfort and dehydration risk.", color: "text-orange-400" };
    if (humidity > 70) return { text: "High humidity. Stay hydrated and avoid strenuous activity.", color: "text-yellow-400" };
    if (humidity < 30) return { text: "Dry air — use moisturizer and drink extra fluids.", color: "text-blue-300" };
    return { text: "Comfortable humidity level.", color: "text-green-400" };
  };

  const getUVAdvice = (uv) => {
    if (uv > 8) return { text: "Extreme UV risk! Avoid going out without sunscreen, sunglasses, and hats.", color: "text-red-400" };
    if (uv > 6) return { text: "Very high UV. Apply sunscreen and wear protective clothing.", color: "text-orange-400" };
    if (uv > 3) return { text: "Moderate UV. Use light sun protection when outdoors.", color: "text-yellow-400" };
    return { text: "Low UV risk. Safe to be outdoors without protection.", color: "text-green-400" };
  };

  const tempAdvice = getTempAdvice(weatherData.temperature);
  const humidityAdvice = getHumidityAdvice(weatherData.humidity);
  const uvAdvice = forecastData ? getUVAdvice(forecastData.daily.uv_index_max[0]) : null;
//   console.log(forecastData.daily.uv_index_max[0])

  return (
    <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Health Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Temperature */}
        <div className="flex items-start space-x-3">
          <Thermometer className="h-5 w-5 mt-0.5 text-orange-300" />
          <div>
            <p className="font-medium">Temperature</p>
            <p className={`text-sm ${tempAdvice.color}`}>{tempAdvice.text}</p>
          </div>
        </div>

        <hr className="border-white/10" />

        {/* Humidity */}
        <div className="flex items-start space-x-3">
          <Droplets className="h-5 w-5 mt-0.5 text-sky-300" />
          <div>
            <p className="font-medium">Humidity</p>
            <p className={`text-sm ${humidityAdvice.color}`}>{humidityAdvice.text}</p>
          </div>
        </div>

        {uvAdvice && (
          <>
            <hr className="border-white/10" />
            {/* UV Index */}
            <div className="flex items-start space-x-3">
              <Sun className="h-5 w-5 mt-0.5 text-yellow-300" />
              <div>
                <p className="font-medium">UV Index</p>
                <p className={`text-sm ${uvAdvice.color}`}>{uvAdvice.text}</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthRecommendations;
