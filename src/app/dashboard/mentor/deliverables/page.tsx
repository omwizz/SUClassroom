import { FileText } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { MentorDeliverablesTable } from "@/features/evaluations/components/mentor-deliverables-table";
import { requireRole } from "@/server/guards/role-guard";
import { getMentorDeliverables } from "@/server/queries/evaluations";

export const dynamic = "force-dynamic";

export default async function MentorDeliverablesPage() {
  const profile = await requireRole(["mentor", "admin"]);
  const deliverables =
    profile.activeRole === "mentor" ? await getMentorDeliverables(profile.id) : [];
  const pending = deliverables.filter((item) =>
    ["submitted", "resubmitted"].includes(item.status),
  ).length;
  const reviewing = deliverables.filter(
    (item) => item.status === "under_review",
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        description="Bandeja de entregables asignados para revisar, aprobar, rechazar o solicitar cambios."
        eyebrow="Mentor"
        title="Entregables asignados"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          detail="Asignados a tu rol"
          icon={FileText}
          title="Total"
          value={String(deliverables.length)}
        />
        <MetricCard
          detail="Listos para abrir revision"
          icon={FileText}
          title="Pendientes"
          value={String(pending)}
          tone="warning"
        />
        <MetricCard
          detail="Con revision iniciada"
          icon={FileText}
          title="En revision"
          value={String(reviewing)}
          tone="info"
        />
      </div>
      <Card className="glass-panel rounded-lg">
        <CardContent className="p-5">
          <MentorDeliverablesTable deliverables={deliverables} />
        </CardContent>
      </Card>
    </div>
  );
}
