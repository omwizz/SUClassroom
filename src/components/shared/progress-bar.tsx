import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  label?: string;
  className?: string;
};

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-mono text-foreground">{value}%</span>
        </div>
      ) : null}
      <Progress value={value} />
    </div>
  );
}
