import Link from "next/link";
import { ArrowLeft, Edit3, FileCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DELIVERABLE_EDITABLE_STATUSES } from "@/constants/deliverables";
import { DeliverableFileList } from "@/features/deliverables/components/deliverable-file-list";
import { DeliverableFileUploader } from "@/features/deliverables/components/deliverable-file-uploader";
import { DeliverableLinkForm } from "@/features/deliverables/components/deliverable-link-form";
import { DeliverableLinkList } from "@/features/deliverables/components/deliverable-link-list";
import { DeliverableRequirementCard } from "@/features/deliverables/components/deliverable-requirement-card";
import { DeliverableStatusBadge } from "@/features/deliverables/components/deliverable-status-badge";
import { DeliverableSubmitButton } from "@/features/deliverables/components/deliverable-submit-button";
import { DeliverableVersionTimeline } from "@/features/deliverables/components/deliverable-version-timeline";
import type {
  DeliverableDetail,
  DeliverableStudentSummary,
} from "@/types/deliverables";

type DeliverableDetailViewProps = {
  deliverable: DeliverableDetail & {
    student?: DeliverableStudentSummary | null;
  };
  adminView?: boolean;
};

export function DeliverableDetailView({
  deliverable,
  adminView = false,
}: DeliverableDetailViewProps) {
  const editable =
    !adminView && DELIVERABLE_EDITABLE_STATUSES.includes(deliverable.status);
  const canSubmit =
    editable && (deliverable.files.length > 0 || deliverable.links.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <DeliverableStatusBadge status={deliverable.status} />
            <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
              Version {deliverable.version}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            {deliverable.title}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {deliverable.description}
          </p>
        </div>
        {!adminView ? (
          <div className="flex flex-wrap gap-2">
            {editable ? (
              <Button asChild variant="secondary">
                <Link href={`/dashboard/student/deliverables/${deliverable.id}/edit`}>
                  <Edit3 />
                  Editar borrador
                </Link>
              </Button>
            ) : null}
            <DeliverableSubmitButton
              deliverableId={deliverable.id}
              disabled={!canSubmit}
              status={deliverable.status}
            />
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="glass-panel rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck2 className="size-4 text-primary" />
                Evidencia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <section className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-medium">Archivos</h2>
                  <span className="text-xs text-muted-foreground">
                    {deliverable.files.length} adjuntos
                  </span>
                </div>
                <DeliverableFileList
                  deliverableId={deliverable.id}
                  editable={editable}
                  files={deliverable.files}
                />
                {editable ? (
                  <DeliverableFileUploader deliverableId={deliverable.id} />
                ) : null}
              </section>

              <Separator />

              <section className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-medium">Enlaces</h2>
                  <span className="text-xs text-muted-foreground">
                    {deliverable.links.length} links
                  </span>
                </div>
                <DeliverableLinkList
                  deliverableId={deliverable.id}
                  editable={editable}
                  links={deliverable.links}
                />
                {editable ? (
                  <DeliverableLinkForm deliverableId={deliverable.id} />
                ) : null}
              </section>
            </CardContent>
          </Card>

          <Card className="glass-panel rounded-lg">
            <CardHeader>
              <CardTitle>Historial de versiones</CardTitle>
            </CardHeader>
            <CardContent>
              <DeliverableVersionTimeline versions={deliverable.versions} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <DeliverableRequirementCard requirement={deliverable.requirement} />
          <Card className="glass-panel rounded-lg">
            <CardHeader>
              <CardTitle>Contexto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="text-xs uppercase text-muted-foreground">Curso</p>
                <p className="mt-1">{deliverable.course?.title ?? "Sin curso"}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground">
                  Proyecto
                </p>
                <p className="mt-1">
                  {deliverable.project?.name ?? "Sin proyecto"}
                </p>
              </div>
              {deliverable.student ? (
                <div>
                  <p className="text-xs uppercase text-muted-foreground">
                    Alumno
                  </p>
                  <p className="mt-1">{deliverable.student.fullName}</p>
                  <p className="text-xs text-muted-foreground">
                    {deliverable.student.email}
                  </p>
                </div>
              ) : null}
              <div>
                <p className="text-xs uppercase text-muted-foreground">
                  Actualizado
                </p>
                <p className="mt-1">
                  {new Intl.DateTimeFormat("es", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(deliverable.updatedAt))}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Button asChild variant="ghost">
        <Link
          href={
            adminView
              ? "/dashboard/admin/deliverables"
              : "/dashboard/student/deliverables"
          }
        >
          <ArrowLeft />
          Volver
        </Link>
      </Button>
    </div>
  );
}

