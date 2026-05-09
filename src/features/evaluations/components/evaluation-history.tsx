import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewStatusBadge } from "@/features/evaluations/components/review-status-badge";
import type { EvaluationDetail } from "@/types/evaluations";

export function EvaluationHistory({
  evaluations,
}: {
  evaluations: EvaluationDetail[];
}) {
  return (
    <Card className="glass-panel rounded-lg">
      <CardHeader>
        <CardTitle>Historial de evaluaciones</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {evaluations.length > 0 ? (
          evaluations.map((evaluation) => (
            <div
              className="rounded-lg border border-border bg-muted/20 p-3"
              key={evaluation.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {evaluation.mentor?.fullName ?? "Revisor"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat("es", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(evaluation.updatedAt))}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ReviewStatusBadge status={evaluation.status} />
                  {evaluation.decision ? (
                    <ReviewStatusBadge decision={evaluation.decision} />
                  ) : null}
                </div>
              </div>
              {evaluation.score !== null ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Score general: {evaluation.score}/100
                </p>
              ) : null}
              {evaluation.feedback ? (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {evaluation.feedback.summary}
                </p>
              ) : null}
            </div>
          ))
        ) : (
          <p className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
            Todavia no hay revisiones registradas.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
