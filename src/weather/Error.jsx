// components/weather/ErrorDisplay.jsx
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

const ErrorDisplay = ({ error }) => {
  if (!error) return null;

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;