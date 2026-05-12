import { UnlockKeyhole } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CourseUnlockService } from "@/server/services/course-unlock-service";
import type { CourseUnlockState } from "@/types/progress";

type CourseUnlockedStateProps = {
  state: CourseUnlockState;
};

export function CourseUnlockedState({ state }: CourseUnlockedStateProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <UnlockKeyhole className="size-4 text-emerald-500" />
      <Badge variant="secondary">
        {CourseUnlockService.labelForReason(state.reason)}
      </Badge>
      <span>{state.message}</span>
    </div>
  );
}
