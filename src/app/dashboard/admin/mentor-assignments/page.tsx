import { PageHeader } from "@/components/dashboard/page-header";
import { MentorAssignmentPanel } from "@/features/evaluations/components/mentor-assignment-panel";
import { requireRole } from "@/server/guards/role-guard";
import { getAdminDeliverables } from "@/server/queries/deliverables";
import { getMentorAssignments } from "@/server/queries/evaluations";
import { getProfilesByRole } from "@/server/queries/profiles";

export const dynamic = "force-dynamic";

export default async function AdminMentorAssignmentsPage() {
  await requireRole(["admin"]);
  const [mentors, deliverables, assignments] = await Promise.all([
    getProfilesByRole("mentor"),
    getAdminDeliverables({
      status: "all",
    }),
    getMentorAssignments(),
  ]);
  const reviewable = deliverables.filter((item) =>
    ["submitted", "resubmitted", "under_review"].includes(item.status),
  );

  return (
    <div className="space-y-6">
      <PageHeader
        description="Asigna mentores a alumnos, proyectos o entregables enviados sin crear flujos avanzados de mentorias."
        eyebrow="Admin"
        title="Asignaciones de mentor"
      />
      <MentorAssignmentPanel
        assignments={assignments}
        deliverables={reviewable}
        mentors={mentors}
      />
    </div>
  );
}
