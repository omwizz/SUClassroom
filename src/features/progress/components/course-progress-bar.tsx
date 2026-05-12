import { Progress } from "@/components/ui/progress";

type CourseProgressBarProps = {
  value: number;
  label?: string;
};

export function CourseProgressBar({ value, label }: CourseProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>{label ?? "Avance"}</span>
        <span className="font-medium text-foreground">{safeValue}%</span>
      </div>
      <Progress value={safeValue} />
    </div>
  );
}
