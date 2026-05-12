import { UnlockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { manualUnlockCourseFromForm } from "@/server/actions/progress-actions";

type ManualUnlockButtonProps = {
  studentId: string;
  courseId: string;
  disabled?: boolean;
};

export function ManualUnlockButton({
  studentId,
  courseId,
  disabled,
}: ManualUnlockButtonProps) {
  return (
    <form action={manualUnlockCourseFromForm.bind(null, { studentId, courseId })}>
      <Button disabled={disabled} size="sm" type="submit" variant="outline">
        <UnlockKeyhole aria-hidden="true" />
        Desbloquear
      </Button>
    </form>
  );
}
