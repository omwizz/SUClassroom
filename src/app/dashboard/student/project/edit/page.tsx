import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectForm } from "@/features/projects/components/project-form";
import { requireRole } from "@/server/guards/role-guard";
import { findCurrentStudentProject } from "@/server/queries/projects";

export const dynamic = "force-dynamic";

export default async function StudentProjectEditPage() {
  const profile = await requireRole(["student", "admin"]);
  const project = await findCurrentStudentProject(profile.id);

  return (
    <div className="space-y-6">
      <PageHeader
        description="Actualiza la ficha inicial de tu proyecto. Los entregables formales se implementaran en una fase posterior."
        eyebrow="Alumno"
        title={project ? "Editar proyecto" : "Crear proyecto"}
      />
      <Card className="glass-panel rounded-lg">
        <CardContent className="p-5 sm:p-6">
          <ProjectForm project={project} />
        </CardContent>
      </Card>
    </div>
  );
}

