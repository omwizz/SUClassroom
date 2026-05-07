import { Badge } from "@/components/ui/badge";
import {
  PROJECT_STATUS_LABELS,
  type ProjectStatus,
} from "@/constants/projects";
import { cn } from "@/lib/utils";

type ProjectStatusBadgeProps = {
  status: ProjectStatus;
};

const statusClassName: Record<ProjectStatus, string> = {
  draft: "border-muted-foreground/30 bg-muted/30 text-muted-foreground",
  active: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  paused: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  completed: "border-primary/30 bg-primary/10 text-primary",
  archived: "border-zinc-500/30 bg-zinc-500/10 text-zinc-300",
};

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  return (
    <Badge className={cn(statusClassName[status])} variant="outline">
      {PROJECT_STATUS_LABELS[status]}
    </Badge>
  );
}

