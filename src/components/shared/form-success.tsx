import { CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FormSuccessProps = {
  message?: string | null;
};

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) {
    return null;
  }

  return (
    <Alert>
      <CheckCircle2 className="size-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

