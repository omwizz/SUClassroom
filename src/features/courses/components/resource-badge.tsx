import { RESOURCE_TYPE_LABELS, type ResourceType } from "@/constants/courses";
import { Badge } from "@/components/ui/badge";

type ResourceBadgeProps = {
  type: ResourceType;
};

export function ResourceBadge({ type }: ResourceBadgeProps) {
  return <Badge variant="outline">{RESOURCE_TYPE_LABELS[type]}</Badge>;
}

