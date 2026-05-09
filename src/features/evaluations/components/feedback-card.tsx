import Link from "next/link";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewStatusBadge } from "@/features/evaluations/components/review-status-badge";
import type { FeedbackDetail } from "@/types/evaluations";

export function FeedbackCard({ feedback }: { feedback: FeedbackDetail }) {
  return (
    <Card className="glass-panel rounded-lg">
      <CardContent className="space-y-4 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 rounded-lg border border-border bg-muted/30 p-2">
              <MessageSquareText className="size-4 text-primary" />
            </span>
            <div>
              <p className="font-medium">
                {feedback.deliverable?.title ?? "Feedback de entregable"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Intl.DateTimeFormat("es", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(feedback.createdAt))}
              </p>
            </div>
          </div>
          <ReviewStatusBadge priority={feedback.priority} />
        </div>

        <p className="text-sm leading-6 text-muted-foreground">
          {feedback.summary}
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-muted/20 p-3">
            <p className="text-xs uppercase text-muted-foreground">Fortalezas</p>
            <p className="mt-2 text-sm">
              {feedback.strengths || "Sin fortalezas registradas."}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-muted/20 p-3">
            <p className="text-xs uppercase text-muted-foreground">Mejoras</p>
            <p className="mt-2 text-sm">
              {feedback.improvements || "Sin mejoras registradas."}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-muted/20 p-3">
            <p className="text-xs uppercase text-muted-foreground">
              Siguiente paso
            </p>
            <p className="mt-2 text-sm">{feedback.nextSteps}</p>
          </div>
        </div>

        {feedback.deliverable ? (
          <Button asChild size="sm" variant="ghost">
            <Link
              href={`/dashboard/student/deliverables/${feedback.deliverable.id}/feedback`}
            >
              Ver detalle
              <ArrowRight />
            </Link>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
