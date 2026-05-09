import { FeedbackCard } from "@/features/evaluations/components/feedback-card";
import type { FeedbackDetail } from "@/types/evaluations";

export function FeedbackTimeline({ items }: { items: FeedbackDetail[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        Aun no hay feedback registrado para este entregable.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <FeedbackCard feedback={item} key={item.id} />
      ))}
    </div>
  );
}
