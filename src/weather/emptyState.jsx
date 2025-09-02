// components/weather/EmptyState.jsx
import { Cloud } from 'lucide-react';
import { Card, CardContent } from "../../components/ui/card";

const EmptyState = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
      <CardContent className="pt-6 text-center py-12">
        <Cloud className="h-16 w-16 text-white/70 mx-auto" />
        <h3 className="mt-4 text-lg font-medium">No weather data</h3>
        <p className="mt-1 text-white/80">Search for a city to get started</p>
      </CardContent>
    </Card>
  );
};

export default EmptyState;