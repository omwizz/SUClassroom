import { COURSE_STATUS_LABELS, type CourseStatus } from "@/constants/courses";
import { Badge } from "@/components/ui/badge";

type CourseStatusBadgeProps = {
  status: CourseStatus;
};

export function CourseStatusBadge({ status }: CourseStatusBadgeProps) {
  const variant =
    status === "published"
      ? "default"
      : status === "archived"
        ? "destructive"
        : "outline";

  return <Badge variant={variant}>{COURSE_STATUS_LABELS[status]}</Badge>;
}

