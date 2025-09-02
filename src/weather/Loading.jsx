// components/weather/LoadingState.jsx
import { Card, CardContent } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

const LoadingState = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
      <CardContent className="pt-6">
        <div className="text-center py-8">
          <Skeleton className="h-16 w-16 rounded-full mx-auto bg-white/20" />
          <Skeleton className="h-6 w-48 mx-auto mt-4 bg-white/20" />
          <Skeleton className="h-12 w-32 mx-auto mt-4 bg-white/20" />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Skeleton className="h-6 w-full bg-white/20" />
            <Skeleton className="h-6 w-full bg-white/20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;