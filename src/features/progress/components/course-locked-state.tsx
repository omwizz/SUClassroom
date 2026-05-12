import { LockKeyhole } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CourseUnlockService } from "@/server/services/course-unlock-service";
import type { CourseUnlockState } from "@/types/progress";

type CourseLockedStateProps = {
  state: CourseUnlockState;
};

export function CourseLockedState({ state }: CourseLockedStateProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <LockKeyhole className="size-4" />
        </span>
        <div className="min-w-0 space-y-2">
          <Badge variant="outline">
            {CourseUnlockService.labelForReason(state.reason)}
          </Badge>
          <p className="text-sm leading-6 text-muted-foreground">
            {state.message}
          </p>
        </div>
      </div>
    </div>
  );
}
