import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone?: "default" | "success" | "warning" | "info";
};

const toneStyles = {
  default: "text-primary",
  success: "text-emerald-300",
  warning: "text-amber-300",
  info: "text-sky-300",
};

export function MetricCard({
  title,
  value,
  detail,
  icon: Icon,
  tone = "default",
}: MetricCardProps) {
  return (
    <Card className="glass-panel rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("size-4", toneStyles[tone])} />
      </CardHeader>
      <CardContent>
        <div className="font-mono text-3xl font-semibold">{value}</div>
        <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}
