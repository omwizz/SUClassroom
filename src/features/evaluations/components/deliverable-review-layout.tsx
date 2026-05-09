import Link from "next/link";
import { ArrowLeft, FileCheck2, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DELIVERABLE_STATUS_LABELS } from "@/constants/deliverables";
import { DeliverableFileList } from "@/features/deliverables/components/deliverable-file-list";
import { DeliverableLinkList } from "@/features/deliverables/components/deliverable-link-list";
import { DeliverableRequirementCard } from "@/features/deliverables/components/deliverable-requirement-card";
import { DeliverableStatusBadge } from "@/features/deliverables/components/deliverable-status-badge";
import { EvaluationCriteriaList } from "@/features/evaluations/components/evaluation-criteria-list";
import { EvaluationForm } from "@/features/evaluations/components/evaluation-form";
import { EvaluationHistory } from "@/features/evaluations/components/evaluation-history";
import { FeedbackTimeline } from "@/features/evaluations/components/feedback-timeline";
import { startEvaluationFromForm } from "@/server/actions/evaluation-actions";
import type {
  DeliverableDetail,
  DeliverableStudentSummary,
} from "@/types/deliverables";
import type {
  EvaluationCriteria,
  EvaluationDetail,
  FeedbackDetail,
} from "@/types/evaluations";

type DeliverableReviewLayoutProps = {
  deliverable: DeliverableDetail & {
    student?: DeliverableStudentSummary | null;
  };
  criteria: EvaluationCriteria[];
  evaluations: EvaluationDetail[];
  feedback: FeedbackDetail[];
  backHref: string;
  canEvaluate: boolean;
};

export function DeliverableReviewLayout({
  deliverable,
  criteria,
  evaluations,
  feedback,
  backHref,
  canEvaluate,
}: DeliverableReviewLayoutProps) {
  const startReview = startEvaluationFromForm.bind(null, {
    deliverableId: deliverable.id,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <DeliverableStatusBadge status={deliverable.status} />
            <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
              {DELIVERABLE_STATUS_LABELS[deliverable.status]}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            {deliverable.title}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {deliverable.description}
          </p>
        </div>
        <form action={startReview}>
          <Button disabled={!canEvaluate} variant="secondary">
            <PlayCircle />
            Iniciar revision
          </Button>
        </form>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <Card className="glass-panel rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck2 className="size-4 text-primary" />
                Evidencia enviada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium">Archivos</h2>
                  <span className="text-xs text-muted-foreground">
                    {deliverable.files.length} archivos
                  </span>
                </div>
                <DeliverableFileList
                  deliverableId={deliverable.id}
                  editable={false}
                  files={deliverable.files}
                />
              </section>

              <Separator />

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium">Enlaces</h2>
                  <span className="text-xs text-muted-foreground">
                    {deliverable.links.length} links
                  </span>
                </div>
                <DeliverableLinkList
                  deliverableId={deliverable.id}
                  editable={false}
                  links={deliverable.links}
                />
              </section>
            </CardContent>
          </Card>

          <FeedbackTimeline items={feedback} />
          <EvaluationHistory evaluations={evaluations} />
        </div>

        <div className="space-y-4">
          <DeliverableRequirementCard requirement={deliverable.requirement} />
          <EvaluationCriteriaList criteria={criteria} />
          <EvaluationForm
            criteria={criteria}
            deliverableId={deliverable.id}
            disabled={!canEvaluate}
          />
        </div>
      </div>

      <Button asChild variant="ghost">
        <Link href={backHref}>
          <ArrowLeft />
          Volver
        </Link>
      </Button>
    </div>
  );
}
