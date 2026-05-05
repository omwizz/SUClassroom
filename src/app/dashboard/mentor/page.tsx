import {
  CalendarClock,
  ClipboardCheck,
  FileText,
  MessageSquareText,
  Users,
} from "lucide-react";
import { ActionCard } from "@/components/dashboard/action-card";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { DataTable } from "@/components/dashboard/data-table";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

const pendingDeliverables = [
  {
    alumno: "Alumno demo",
    entregable: "Hipótesis de proyecto",
    estado: "Pendiente",
  },
  {
    alumno: "Participante demo",
    entregable: "Evidencia de validación",
    estado: "En revisión",
  },
];

export default async function MentorDashboardPage() {
  await requireRole(["mentor", "admin"]);

  return (
    <div className="space-y-8">
      <PageHeader
        description="Prioriza entregables, alumnos asignados y próximas sesiones de acompañamiento."
        eyebrow="Dashboard mentor"
        title="Panel de revisión"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          detail="Placeholder para bandeja de revisión"
          icon={FileText}
          title="Entregables pendientes"
          value="8"
          tone="warning"
        />
        <MetricCard
          detail="Asignación futura por admin"
          icon={Users}
          title="Alumnos asignados"
          value="24"
        />
        <MetricCard
          detail="Agenda preparada para fase posterior"
          icon={CalendarClock}
          title="Asesorías próximas"
          value="3"
          tone="info"
        />
        <MetricCard
          detail="Métrica base de productividad"
          icon={ClipboardCheck}
          title="Revisiones aprobadas"
          value="16"
          tone="success"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="glass-panel rounded-lg">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>Entregables recientes</CardTitle>
              <StatusBadge status="Próxima fase" />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { header: "Alumno", accessor: "alumno" },
                { header: "Entregable", accessor: "entregable" },
                { header: "Estado", accessor: "estado" },
              ]}
              data={pendingDeliverables}
            />
          </CardContent>
        </Card>

        <DashboardSection title="Accesos rápidos">
          <div className="grid gap-4">
            <ActionCard
              description="Bandeja placeholder de entregables por revisar."
              href="/dashboard/mentor/deliverables"
              icon={FileText}
              title="Entregables"
            />
            <ActionCard
              description="Base para emitir evaluación y feedback estructurado."
              href="/dashboard/mentor/evaluations"
              icon={MessageSquareText}
              title="Evaluaciones"
            />
          </div>
        </DashboardSection>
      </div>
    </div>
  );
}
