// components/weather/ForecastTabs.jsx
import { Clock, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { getWeatherIcon, getWeatherDescription, getUvIndexLevel } from '../utilities/WeatherUtility.jsx';

const ForecastTabs = ({ forecastData }) => {
  if (!forecastData) return null;

  return (
    <Tabs defaultValue="hourly" className="mt-6">
      <TabsList className="grid w-full grid-cols-2 bg-white/10">
        <TabsTrigger value="hourly" className="data-[state=active]:bg-white/20">
          <Clock className="h-4 w-4 mr-2" /> Hourly Forecast
        </TabsTrigger>
        <TabsTrigger value="daily" className="data-[state=active]:bg-white/20">
          <Calendar className="h-4 w-4 mr-2" /> 7-Day Forecast
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="hourly" className="mt-4">
        <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
          <CardHeader>
            <CardTitle>24-Hour Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex overflow-x-auto pb-4 space-x-4">
              {forecastData.hourly.time.slice(0, 24).map((time, index) => (
                <div key={index} className="flex-shrink-0 w-20 text-center p-3 bg-white/10 rounded-lg">
                  <p className="font-medium text-sm">
                    {new Date(time).toLocaleTimeString([], { hour: '2-digit' })}
                  </p>
                  <div className="my-2 flex justify-center">
                    {getWeatherIcon(forecastData.hourly.weathercode[index], "h-8 w-8")}
                  </div>
                  <p className="text-lg font-bold">
                    {forecastData.hourly.temperature_2m[index]}°C
                  </p>
                  <p className="text-xs text-white/80 mt-1">
                    {forecastData.hourly.windspeed_10m[index]} km/h
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="daily" className="mt-4">
        <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
          <CardHeader>
            <CardTitle>7-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {forecastData.daily.time.map((date, index) => {
                const uvLevel = getUvIndexLevel(forecastData.daily.uv_index_max[index]);
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center w-1/3">
                      <div className="w-20">
                        <p className="font-medium">
                          {new Date(date).toLocaleDateString([], { weekday: 'short' })}
                        </p>
                        <p className="text-sm text-white/80">
                          {new Date(date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div className="mx-2">
                        {getWeatherIcon(forecastData.daily.weathercode[index], "h-10 w-10")}
                      </div>
                    </div>
                    <div className="w-1/3 text-center">
                      <p className="text-sm">
                        {getWeatherDescription(forecastData.daily.weathercode[index])}
                      </p>
                      {forecastData.daily.precipitation_sum[index] > 0 && (
                        <p className="text-xs text-white/80 mt-1">
                          Precip: {forecastData.daily.precipitation_sum[index]}mm
                        </p>
                      )}
                    </div>
                    <div className="w-1/3 text-right">
                      <p className="font-bold text-lg">
                        {forecastData.daily.temperature_2m_max[index]}°C
                      </p>
                      <p className="text-sm text-white/80">
                        {forecastData.daily.temperature_2m_min[index]}°C
                      </p>
                      <p className={`text-xs mt-1 ${uvLevel.color}`}>
                        UV: {forecastData.daily.uv_index_max[index]} ({uvLevel.level})
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ForecastTabs;