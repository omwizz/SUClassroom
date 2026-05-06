import { COURSE_LEVEL_LABELS, type CourseLevel } from "@/constants/courses";
import { Badge } from "@/components/ui/badge";

type CourseLevelBadgeProps = {
  level: CourseLevel;
};

export function CourseLevelBadge({ level }: CourseLevelBadgeProps) {
  return <Badge variant="secondary">{COURSE_LEVEL_LABELS[level]}</Badge>;
}

