import { Clock3 } from "lucide-react";
import { PROGRESS_EVENT_TYPE_LABELS } from "@/constants/progress";
import type { ProgressEvent } from "@/types/progress";

type StudentProgressTimelineProps = {
  events: ProgressEvent[];
};

export function StudentProgressTimeline({ events }: StudentProgressTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
        Aun no hay eventos de progreso registrados.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div
          className="flex gap-3 rounded-lg border border-border bg-card p-4"
          key={event.id}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Clock3 className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="font-medium">
              {PROGRESS_EVENT_TYPE_LABELS[event.eventType]}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {new Date(event.createdAt).toLocaleString("es-PE")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
