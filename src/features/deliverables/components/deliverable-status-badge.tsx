import { Badge } from "@/components/ui/badge";
import {
  DELIVERABLE_STATUS_LABELS,
  type DeliverableStatus,
} from "@/constants/deliverables";
import { cn } from "@/lib/utils";

const statusStyles: Record<DeliverableStatus, string> = {
  draft: "border-muted bg-muted/50 text-muted-foreground",
  submitted: "border-sky-400/20 bg-sky-400/10 text-sky-300",
  under_review: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  changes_requested: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  rejected: "border-destructive/30 bg-destructive/10 text-destructive",
  approved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  resubmitted: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
};

export function DeliverableStatusBadge({
  status,
}: {
  status: DeliverableStatus;
}) {
  return (
    <Badge className={cn("border", statusStyles[status])} variant="outline">
      {DELIVERABLE_STATUS_LABELS[status]}
    </Badge>
  );
}

