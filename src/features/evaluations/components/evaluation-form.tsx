"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  type EvaluationDecision,
  FEEDBACK_PRIORITIES,
} from "@/constants/evaluations";
import { submitEvaluation } from "@/server/actions/evaluation-actions";
import type { EvaluationActionState, EvaluationCriteria } from "@/types/evaluations";
import { EvaluationDecisionButtons } from "@/features/evaluations/components/evaluation-decision-buttons";
import { FeedbackForm } from "@/features/evaluations/components/feedback-form";

type EvaluationFormProps = {
  deliverableId: string;
  criteria: EvaluationCriteria[];
  disabled?: boolean;
};

export function EvaluationForm({
  deliverableId,
  criteria,
  disabled = false,
}: EvaluationFormProps) {
  const [decision, setDecision] = useState<EvaluationDecision>("approved");
  const [state, setState] = useState<EvaluationActionState | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    const score = Number(formData.get("score") ?? 0);
    const criteriaScores = criteria.map((item) => ({
      criteriaId: item.id,
      score: Number(formData.get(`criteria-${item.id}`) ?? 0),
      comment: String(formData.get(`comment-${item.id}`) ?? ""),
    }));
    const priority = String(formData.get("priority") ?? "medium");

    startTransition(async () => {
      const result = await submitEvaluation({
        deliverableId,
        decision,
        score: Number.isFinite(score) ? score : undefined,
        criteriaScores,
        feedback: {
          summary: String(formData.get("summary") ?? ""),
          strengths: String(formData.get("strengths") ?? ""),
          improvements: String(formData.get("improvements") ?? ""),
          nextSteps: String(formData.get("nextSteps") ?? ""),
          priority: FEEDBACK_PRIORITIES.includes(
            priority as (typeof FEEDBACK_PRIORITIES)[number],
          )
            ? (priority as (typeof FEEDBACK_PRIORITIES)[number])
            : "medium",
          isVisibleToStudent: formData.get("isVisibleToStudent") === "on",
        },
      });

      setState(result);

      if (result.ok && result.redirectTo) {
        window.location.href = result.redirectTo;
      }
    });
  }

  return (
    <Card className="glass-panel rounded-lg">
      <CardHeader>
        <CardTitle>Evaluar entregable</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="space-y-5">
          <EvaluationDecisionButtons value={decision} onChange={setDecision} />

          <div className="grid gap-2">
            <Label htmlFor="score">Score general</Label>
            <Input
              id="score"
              max={100}
              min={0}
              name="score"
              placeholder="0 - 100"
              type="number"
            />
          </div>

          {criteria.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm font-medium">Criterios del curso</p>
              {criteria.map((item) => (
                <div
                  className="grid gap-3 rounded-lg border border-border bg-muted/20 p-3 md:grid-cols-[140px_1fr]"
                  key={item.id}
                >
                  <div>
                    <Label htmlFor={`criteria-${item.id}`}>{item.title}</Label>
                    <Input
                      id={`criteria-${item.id}`}
                      max={item.maxScore}
                      min={0}
                      name={`criteria-${item.id}`}
                      required={item.isRequired}
                      type="number"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Maximo {item.maxScore}
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`comment-${item.id}`}>Comentario</Label>
                    <Textarea
                      id={`comment-${item.id}`}
                      name={`comment-${item.id}`}
                      placeholder="Observacion breve sobre este criterio."
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <FeedbackForm />

          {state ? (
            <p
              className={
                state.ok
                  ? "rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-300"
                  : "rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
              }
            >
              {state.message}
            </p>
          ) : null}

          <Button disabled={disabled || pending} type="submit">
            <Send />
            {pending ? "Guardando..." : "Enviar evaluacion"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
