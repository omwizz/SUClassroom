import { Badge } from "@/components/ui/badge";
import {
  EVALUATION_DECISION_LABELS,
  EVALUATION_STATUS_LABELS,
  FEEDBACK_PRIORITY_LABELS,
  type EvaluationDecision,
  type EvaluationStatus,
  type FeedbackPriority,
} from "@/constants/evaluations";
import { cn } from "@/lib/utils";

const styles = {
  approved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  rejected: "border-destructive/30 bg-destructive/10 text-destructive",
  changes_requested: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  pending: "border-muted bg-muted/50 text-muted-foreground",
  in_progress: "border-sky-400/25 bg-sky-400/10 text-sky-300",
  completed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  low: "border-muted bg-muted/40 text-muted-foreground",
  medium: "border-sky-400/25 bg-sky-400/10 text-sky-300",
  high: "border-amber-400/25 bg-amber-400/10 text-amber-300",
};

type ReviewStatusBadgeProps =
  | { decision: EvaluationDecision; status?: never; priority?: never }
  | { status: EvaluationStatus; decision?: never; priority?: never }
  | { priority: FeedbackPriority; decision?: never; status?: never };

export function ReviewStatusBadge(props: ReviewStatusBadgeProps) {
  const key = props.decision ?? props.status ?? props.priority;
  const label = props.decision
    ? EVALUATION_DECISION_LABELS[props.decision]
    : props.status
      ? EVALUATION_STATUS_LABELS[props.status]
      : FEEDBACK_PRIORITY_LABELS[props.priority];

  return (
    <Badge className={cn("border", styles[key])} variant="outline">
      {label}
    </Badge>
  );
}
