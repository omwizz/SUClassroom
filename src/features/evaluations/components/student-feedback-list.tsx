import { FeedbackCard } from "@/features/evaluations/components/feedback-card";
import type { FeedbackDetail } from "@/types/evaluations";

export function StudentFeedbackList({ feedback }: { feedback: FeedbackDetail[] }) {
  return (
    <div className="space-y-4">
      {feedback.length > 0 ? (
        feedback.map((item) => <FeedbackCard feedback={item} key={item.id} />)
      ) : (
        <p className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
          Aun no tienes feedback visible. Cuando un mentor revise tu entregable,
          aparecera aqui con proximos pasos.
        </p>
      )}
    </div>
  );
}
