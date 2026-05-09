import { ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EvaluationCriteria, EvaluationScore } from "@/types/evaluations";

type EvaluationCriteriaListProps = {
  criteria: EvaluationCriteria[];
  scores?: EvaluationScore[];
};

export function EvaluationCriteriaList({
  criteria,
  scores = [],
}: EvaluationCriteriaListProps) {
  const scoreByCriteria = new Map(
    scores.map((score) => [score.criteriaId, score]),
  );

  return (
    <Card className="glass-panel rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="size-4 text-primary" />
          Criterios
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {criteria.length > 0 ? (
          criteria.map((item) => {
            const score = scoreByCriteria.get(item.id);

            return (
              <div
                className="rounded-lg border border-border bg-muted/20 p-3"
                key={item.id}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    {item.description ? (
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    {score ? `${score.score}/` : ""}
                    {item.maxScore}
                  </span>
                </div>
                {score?.comment ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {score.comment}
                  </p>
                ) : null}
              </div>
            );
          })
        ) : (
          <p className="rounded-lg border border-border bg-muted/20 p-3 text-sm text-muted-foreground">
            Este curso aun no tiene criterios configurados. El mentor puede
            evaluar con score general y feedback accionable.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
