import { MessageSquareText } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { StudentFeedbackList } from "@/features/evaluations/components/student-feedback-list";
import { requireRole } from "@/server/guards/role-guard";
import { getStudentFeedback } from "@/server/queries/evaluations";

export const dynamic = "force-dynamic";

export default async function StudentFeedbackPage() {
  const profile = await requireRole(["student", "admin"]);
  const feedback =
    profile.activeRole === "student" ? await getStudentFeedback(profile.id) : [];
  const highPriority = feedback.filter((item) => item.priority === "high").length;

  return (
    <div className="space-y-6">
      <PageHeader
        description="Revisa observaciones visibles, fortalezas y proximos pasos para corregir o avanzar."
        eyebrow="Alumno"
        title="Feedback recibido"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard
          detail="Feedback visible para ti"
          icon={MessageSquareText}
          title="Mensajes"
          value={String(feedback.length)}
          tone="info"
        />
        <MetricCard
          detail="Requiere accion prioritaria"
          icon={MessageSquareText}
          title="Alta prioridad"
          value={String(highPriority)}
          tone="warning"
        />
      </div>
      <StudentFeedbackList feedback={feedback} />
    </div>
  );
}
