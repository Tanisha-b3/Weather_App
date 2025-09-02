// components/weather/RecentSearches.jsx
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const RecentSearches = ({ recentSearches, handleRecentSearchClick }) => {
  if (!recentSearches.length) return null;

  return (
    <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Recent Searches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentSearches.slice(0, 5).map((search, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start bg-white/5 hover:bg-white/10 border-white/10"
              onClick={() => handleRecentSearchClick(search.city)}
            >
              <MapPin className="h-4 w-4 mr-2" />
              {search.city}, {search.country}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSearches;
