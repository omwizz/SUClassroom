"use client";

import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import {
  EVALUATION_DECISION_LABELS,
  type EvaluationDecision,
} from "@/constants/evaluations";
import { cn } from "@/lib/utils";

const options: Array<{
  value: EvaluationDecision;
  icon: typeof CheckCircle2;
  description: string;
}> = [
  {
    value: "approved",
    icon: CheckCircle2,
    description: "El entregable cumple el objetivo.",
  },
  {
    value: "changes_requested",
    icon: RotateCcw,
    description: "El alumno debe ajustar y reenviar.",
  },
  {
    value: "rejected",
    icon: XCircle,
    description: "No cumple la evidencia minima.",
  },
];

type EvaluationDecisionButtonsProps = {
  value: EvaluationDecision;
  onChange: (value: EvaluationDecision) => void;
};

export function EvaluationDecisionButtons({
  value,
  onChange,
}: EvaluationDecisionButtonsProps) {
  return (
    <div className="grid gap-2 md:grid-cols-3">
      {options.map((option) => {
        const Icon = option.icon;
        const selected = value === option.value;

        return (
          <button
            className={cn(
              "rounded-lg border border-border bg-muted/20 p-3 text-left transition hover:border-primary/50",
              selected && "border-primary bg-primary/10 text-primary",
            )}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            <Icon className="size-4" />
            <p className="mt-2 text-sm font-medium">
              {EVALUATION_DECISION_LABELS[option.value]}
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {option.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
