import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markLessonCompletedFromForm } from "@/server/actions/progress-actions";

type LessonProgressButtonProps = {
  courseId: string;
  lessonId: string;
  completed?: boolean;
};

export function LessonProgressButton({
  courseId,
  lessonId,
  completed,
}: LessonProgressButtonProps) {
  if (completed) {
    return (
      <Button disabled variant="secondary">
        <CheckCircle2 aria-hidden="true" />
        Leccion completada
      </Button>
    );
  }

  return (
    <form
      action={markLessonCompletedFromForm.bind(null, { courseId, lessonId })}
    >
      <Button type="submit">
        <CheckCircle2 aria-hidden="true" />
        Marcar completada
      </Button>
    </form>
  );
}
