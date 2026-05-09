import {
  CalendarClock,
  ClipboardCheck,
  FileText,
  MessageSquareText,
  Users,
} from "lucide-react";
import { ActionCard } from "@/components/dashboard/action-card";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { MentorDeliverablesTable } from "@/features/evaluations/components/mentor-deliverables-table";
import { requireRole } from "@/server/guards/role-guard";
import {
  getMentorAssignments,
  getMentorDeliverables,
  getMentorEvaluationHistory,
} from "@/server/queries/evaluations";

export const dynamic = "force-dynamic";

export default async function MentorDashboardPage() {
  const profile = await requireRole(["mentor", "admin"]);
  const [deliverables, assignments, evaluations] =
    profile.activeRole === "mentor"
      ? await Promise.all([
          getMentorDeliverables(profile.id),
          getMentorAssignments(profile.id),
          getMentorEvaluationHistory(profile.id),
        ])
      : [[], [], []];
  const pending = deliverables.filter((item) =>
    ["submitted", "resubmitted"].includes(item.status),
  ).length;
  const reviewing = deliverables.filter(
    (item) => item.status === "under_review",
  ).length;
  const approved = evaluations.filter(
    (item) => item.decision === "approved",
  ).length;

  return (
    <div className="space-y-8">
      <PageHeader
        description="Prioriza entregables asignados, revisiones abiertas y feedback accionable."
        eyebrow="Dashboard mentor"
        title="Panel de revision"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          detail="Listos para revisar"
          icon={FileText}
          title="Pendientes"
          value={String(pending)}
          tone="warning"
        />
        <MetricCard
          detail="Con revision iniciada"
          icon={ClipboardCheck}
          title="En revision"
          value={String(reviewing)}
          tone="info"
        />
        <MetricCard
          detail="Asignaciones activas e historicas"
          icon={Users}
          title="Alumnos asignados"
          value={String(assignments.length)}
        />
        <MetricCard
          detail="Evaluaciones aprobadas"
          icon={ClipboardCheck}
          title="Aprobados"
          value={String(approved)}
          tone="success"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="glass-panel rounded-lg">
          <CardContent className="p-5">
            <MentorDeliverablesTable deliverables={deliverables.slice(0, 6)} />
          </CardContent>
        </Card>

        <DashboardSection title="Accesos rapidos">
          <div className="grid gap-4">
            <ActionCard
              description="Abre tu bandeja de entregables asignados."
              href="/dashboard/mentor/deliverables"
              icon={FileText}
              title="Revisar entregables"
            />
            <ActionCard
              description="Consulta decisiones, scores y feedback emitido."
              href="/dashboard/mentor/evaluations"
              icon={MessageSquareText}
              title="Evaluaciones"
            />
            <ActionCard
              description="Agenda preparada para una fase posterior."
              href="/dashboard/mentor/mentorship"
              icon={CalendarClock}
              title="Mentorias"
            />
          </div>
        </DashboardSection>
      </div>
    </div>
  );
}
