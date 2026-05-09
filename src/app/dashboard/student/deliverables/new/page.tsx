import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { DeliverableForm } from "@/features/deliverables/components/deliverable-form";
import { requireRole } from "@/server/guards/role-guard";
import { getPublishedCourses } from "@/server/queries/courses";
import { findCurrentStudentProject } from "@/server/queries/projects";

export const dynamic = "force-dynamic";

type NewDeliverablePageProps = {
  searchParams: Promise<{ courseId?: string }>;
};

export default async function NewDeliverablePage({
  searchParams,
}: NewDeliverablePageProps) {
  const profile = await requireRole(["student"]);
  const params = await searchParams;
  const [project, courses] = await Promise.all([
    findCurrentStudentProject(profile.id),
    getPublishedCourses(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        description="Crea un borrador y luego adjunta archivos o enlaces antes de enviarlo."
        eyebrow="Alumno"
        title="Nuevo entregable"
      />
      <Card className="glass-panel rounded-lg">
        <CardContent className="p-5 sm:p-6">
          {project ? (
            <DeliverableForm
              courses={courses}
              project={project}
              selectedCourseId={params.courseId}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              Necesitas registrar tu proyecto antes de crear entregables.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

