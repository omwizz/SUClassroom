import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { ASSIGNMENT_STATUS_LABELS } from "@/constants/evaluations";
import { requireRole } from "@/server/guards/role-guard";
import { getMentorAssignments } from "@/server/queries/evaluations";

export const dynamic = "force-dynamic";

export default async function MentorStudentsPage() {
  const profile = await requireRole(["mentor", "admin"]);
  const assignments =
    profile.activeRole === "mentor" ? await getMentorAssignments(profile.id) : [];

  return (
    <div className="space-y-6">
      <PageHeader
        description="Alumnos, proyectos y cursos asignados a tu bandeja de revision."
        eyebrow="Mentor"
        title="Alumnos asignados"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <Card className="glass-panel rounded-lg" key={assignment.id}>
              <CardContent className="p-5">
                <p className="font-medium">
                  {assignment.student?.fullName ?? "Alumno"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {assignment.student?.email ?? "Sin email"}
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <p>{assignment.project?.name ?? "Todos sus proyectos"}</p>
                  <p className="text-muted-foreground">
                    {assignment.course?.title ?? "Todos sus cursos"}
                  </p>
                </div>
                <p className="mt-4 text-xs text-primary">
                  {ASSIGNMENT_STATUS_LABELS[assignment.status]}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="glass-panel rounded-lg md:col-span-2 xl:col-span-3">
            <CardContent className="p-5 text-sm text-muted-foreground">
              Aun no tienes alumnos asignados.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
