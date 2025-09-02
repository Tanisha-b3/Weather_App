// App.jsx
import { useWeather } from './hooks/customHook';
import { getBackgroundClass, isDayTime} from './utilities/WeatherUtility';
import Header from './Weather_Components/Header';
import CurrentWeather from './Weather_Components/currentWeather';
import ForecastTabs from './Weather_Components/foreCast';
import RecentSearches from './Weather_Components/RecentSearches';
import HealthRecommendations from './Weather_Components/HealthRecommendation';
import LoadingState from './weather/Loading';
import EmptyState from './weather/emptyState';
import ErrorDisplay from './weather/Error';
import Footer from './weather/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import InteractiveMap from './utilities/InteractiveMap';
function App() {
  const {
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
  } = useWeather();
   const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };
  const handleCitySelect = (cityName) => {
    setCity(cityName);
    fetchWeatherData(cityName);
  };


  const handleRefreshData = () => {
    if (weatherData) {
      fetchWeatherData(weatherData.city);
    }
  };
  const backgroundClass = weatherData 
    ? getBackgroundClass(weatherData.weathercode, isDayTime(weatherData)) 
    : 'from-blue-400 to-blue-600';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundClass} text-white`}>
      <div className="container mx-auto px-4 py-6">
       <Header
          city={city}
          setCity={setCity}
          loading={loading}
          weatherData={weatherData}
          handleSubmit={handleSubmit}
          handleRefresh={handleRefreshData}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Current Weather */}
          <div className="lg:col-span-2">
            <ErrorDisplay error={error} />
            
            {weatherData && !error && (
              <>
                <CurrentWeather weatherData={weatherData} lastUpdated={lastUpdated} />
                <ForecastTabs forecastData={forecastData} />
              </>
            )}
            
            {!weatherData && !error && !loading && <EmptyState />}
            {loading && <LoadingState />}
          </div>
          
          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            <RecentSearches 
              recentSearches={recentSearches} 
              handleRecentSearchClick={handleRecentSearchClick} 
            />
            
               <InteractiveMap
              weatherData={weatherData} 
              onCitySelect={handleCitySelect}
            />
          
            
            <HealthRecommendations 
              weatherData={weatherData} 
              forecastData={forecastData} 
            />
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;