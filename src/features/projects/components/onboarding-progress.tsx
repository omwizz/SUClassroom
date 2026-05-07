import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type OnboardingProgressProps = {
  currentStep: number;
  steps: string[];
};

export function OnboardingProgress({
  currentStep,
  steps,
}: OnboardingProgressProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isDone = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg border border-border bg-muted/20 p-3 text-sm",
              isCurrent && "border-primary/40 bg-primary/10 text-primary",
            )}
            key={step}
          >
            <span
              className={cn(
                "flex size-7 items-center justify-center rounded-md bg-muted font-mono text-xs",
                isDone && "bg-emerald-500/15 text-emerald-200",
                isCurrent && "bg-primary/15 text-primary",
              )}
            >
              {isDone ? <Check className="size-4" /> : stepNumber}
            </span>
            <span className="truncate">{step}</span>
          </div>
        );
      })}
    </div>
  );
}

