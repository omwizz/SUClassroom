import { Badge } from "@/components/ui/badge";
import {
  PROJECT_STAGE_LABELS,
  type ProjectStage,
} from "@/constants/projects";

type ProjectStageBadgeProps = {
  stage: ProjectStage;
};

export function ProjectStageBadge({ stage }: ProjectStageBadgeProps) {
  return (
    <Badge className="border-sky-500/30 bg-sky-500/10 text-sky-200" variant="outline">
      {PROJECT_STAGE_LABELS[stage]}
    </Badge>
  );
}

