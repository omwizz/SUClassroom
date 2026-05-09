import { PageHeader } from "@/components/dashboard/page-header";
import { ProjectDetailView } from "@/features/projects/components/project-detail-view";
import { StudentProjectPanel } from "@/features/projects/components/student-project-panel";
import { requireRole } from "@/server/guards/role-guard";
import { findCurrentStudentProject } from "@/server/queries/projects";

export const dynamic = "force-dynamic";

export default async function StudentProjectPage() {
  const profile = await requireRole(["student", "admin"]);
  const project = await findCurrentStudentProject(profile.id);

  return (
    <div className="space-y-6">
      <PageHeader
        description="Consulta la ficha base de tu proyecto y mantenla alineada con los entregables que prepares en tus cursos."
        eyebrow="Alumno"
        title="Mi proyecto"
      />
      {project ? (
        <ProjectDetailView project={project} />
      ) : (
        <StudentProjectPanel project={null} />
      )}
    </div>
  );
}
