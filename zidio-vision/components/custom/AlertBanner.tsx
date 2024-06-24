import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, TriangleAlert } from "lucide-react";

// Define a type for the variant prop of Alert component
type AlertVariant = "default" | "destructive" | null | undefined;

interface AlertBannerProps {
  isCompleted: boolean;
  requiredFieldsCount: number;
  missingFieldsCount: number;
}

const AlertBanner = ({
  isCompleted,
  requiredFieldsCount,
  missingFieldsCount,
}: AlertBannerProps) => {
  // Determine the variant based on isCompleted prop
  let variant: AlertVariant = null; // Default to null if isCompleted is neither true nor false
  if (isCompleted) {
    variant = "complete" as AlertVariant; // Type assertion to explicitly cast "complete" to AlertVariant
  } else {
    variant = "destructive" as AlertVariant; // Type assertion to explicitly cast "destructive" to AlertVariant
  }

  return (
    <Alert className="my-4" variant={variant}>
      {isCompleted ? (
        <Rocket className="h-4 w-4" />
      ) : (
        <TriangleAlert className="h-4 w-4" />
      )}
      <AlertTitle className="text-xs font-medium">
        {missingFieldsCount} missing field(s) / {requiredFieldsCount} required
        fields
      </AlertTitle>
      <AlertDescription className="text-xs">
        {isCompleted
          ? "Great job! Ready to publish"
          : "You can only publish when all the required fields are completed"}
      </AlertDescription>
    </Alert>
  );
};

export default AlertBanner;
