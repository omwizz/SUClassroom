import { GitCommitVertical } from "lucide-react";
import { DeliverableStatusBadge } from "@/features/deliverables/components/deliverable-status-badge";
import type { DeliverableVersion } from "@/types/deliverables";

export function DeliverableVersionTimeline({
  versions,
}: {
  versions: DeliverableVersion[];
}) {
  if (versions.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        El historial aparecera cuando envies el entregable.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {versions.map((version) => (
        <div className="flex gap-3" key={version.id}>
          <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40">
            <GitCommitVertical className="size-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1 rounded-lg border border-border bg-card p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">Version {version.version}</p>
              <DeliverableStatusBadge status={version.status} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {version.title}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {new Intl.DateTimeFormat("es", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(version.createdAt))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

