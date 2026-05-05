import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  aprobado: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  completado: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  activo: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  pendiente: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  "en revisión": "border-sky-400/20 bg-sky-400/10 text-sky-300",
  bloqueado: "border-muted bg-muted/50 text-muted-foreground",
  rechazado: "border-destructive/30 bg-destructive/10 text-destructive",
  "próxima fase": "border-primary/25 bg-primary/10 text-primary",
};

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  return (
    <Badge className={cn("border", statusStyles[normalized])} variant="outline">
      {status}
    </Badge>
  );
}
