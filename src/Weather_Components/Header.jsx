import { Search, Cloud, RefreshCw } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function Header({ 
  city, 
  setCity, 
  loading, 
  weatherData, 
  handleSubmit, 
  handleRefresh 
}) {
  // Debug log to check what props are received
  console.log("Header props:", { city, loading, hasWeatherData: !!weatherData });
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (handleSubmit) {
      handleSubmit(e);
    }
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div className="flex items-center mb-4 md:mb-0">
        <Cloud className="h-8 w-8 mr-2" />
        <h1 className="text-2xl font-bold">Weather Dashboard</h1>
      </div>

      <form onSubmit={onSubmit} className="w-full md:w-auto">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              className="pl-9 bg-white/90 text-gray-900 border-0"
              placeholder="Enter city name"
              value={city || ""}
              onChange={(e) => setCity && setCity(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading} 
            className="bg-white/20 hover:bg-white/30 border-0"
          >
            {loading ? "Searching..." : "Search"}
          </Button>
          {weatherData && (
            <Button
              type="button"
              onClick={handleRefresh}
              disabled={loading}
              variant="outline"
              className="bg-white/20 hover:bg-white/30 border-0"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </header>
  );
}