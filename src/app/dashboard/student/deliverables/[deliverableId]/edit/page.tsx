import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { DELIVERABLE_EDITABLE_STATUSES } from "@/constants/deliverables";
import { DeliverableDraftEditor } from "@/features/deliverables/components/deliverable-draft-editor";
import { requireRole } from "@/server/guards/role-guard";
import { getPublishedCourses } from "@/server/queries/courses";
import { getStudentDeliverableById } from "@/server/queries/deliverables";
import { findStudentProjectById } from "@/server/queries/projects";

export const dynamic = "force-dynamic";

type StudentDeliverableEditPageProps = {
  params: Promise<{ deliverableId: string }>;
};

export default async function StudentDeliverableEditPage({
  params,
}: StudentDeliverableEditPageProps) {
  const profile = await requireRole(["student"]);
  const { deliverableId } = await params;
  const deliverable = await getStudentDeliverableById(deliverableId, profile.id);

  if (!deliverable) {
    notFound();
  }

  const [project, courses] = await Promise.all([
    findStudentProjectById(deliverable.projectId),
    getPublishedCourses(),
  ]);

  if (!project) {
    notFound();
  }

  const editable = DELIVERABLE_EDITABLE_STATUSES.includes(deliverable.status);

  return (
    <div className="space-y-6">
      <PageHeader
        description="Actualiza el borrador antes de enviarlo. Los entregables enviados quedan bloqueados para preservar historial."
        eyebrow="Alumno"
        title="Editar entregable"
      />
      <Card className="glass-panel rounded-lg">
        <CardContent className="p-5 sm:p-6">
          {editable ? (
            <DeliverableDraftEditor
              courses={courses}
              deliverable={deliverable}
              project={project}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              Este entregable ya fue enviado o esta en revision. No se puede
              editar libremente en este estado.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

