import {
  BarChart3,
  BookOpen,
  CalendarClock,
  FileText,
  HandCoins,
  Users,
} from "lucide-react";
import { ChartCard } from "@/components/dashboard/chart-card";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { DataTable } from "@/components/dashboard/data-table";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DELIVERABLE_STATUS_LABELS } from "@/constants/deliverables";
import { EVALUATION_DECISION_LABELS } from "@/constants/evaluations";
import { requireRole } from "@/server/guards/role-guard";
import { getAdminDeliverables } from "@/server/queries/deliverables";
import { getMentorAssignments } from "@/server/queries/evaluations";

export const dynamic = "force-dynamic";

const executionData = [
  { label: "Sem 1", value: 12 },
  { label: "Sem 2", value: 20 },
  { label: "Sem 3", value: 28 },
  { label: "Sem 4", value: 36 },
  { label: "Sem 5", value: 44 },
  { label: "Sem 6", value: 58 },
];

export default async function AdminDashboardPage() {
  await requireRole(["admin"]);
  const [deliverables, assignments] = await Promise.all([
    getAdminDeliverables(),
    getMentorAssignments(),
  ]);
  const sentDeliverables = deliverables.filter((item) =>
    ["submitted", "resubmitted", "under_review"].includes(item.status),
  ).length;
  const approved = deliverables.filter((item) => item.status === "approved").length;
  const needsChanges = deliverables.filter((item) =>
    ["changes_requested", "rejected"].includes(item.status),
  ).length;
  const activity = deliverables.slice(0, 4).map((item) => ({
    evento: item.title,
    modulo: item.course?.title ?? "Curso",
    estado:
      item.status === "approved"
        ? EVALUATION_DECISION_LABELS.approved
        : DELIVERABLE_STATUS_LABELS[item.status],
  }));

  return (
    <div className="space-y-8">
      <PageHeader
        actions={<StatusBadge status="Fase 6 activa" />}
        description="Vista base para operar usuarios, cursos, entregables, mentorias, pagos y reportes."
        eyebrow="Dashboard admin"
        title="Centro operativo"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          detail="Placeholder de usuarios"
          icon={Users}
          title="Usuarios"
          value="128"
        />
        <MetricCard
          detail="Cursos creados en Fase 3"
          icon={BookOpen}
          title="Cursos"
          value="4"
          tone="info"
        />
        <MetricCard
          detail={`${sentDeliverables} pendientes de revision`}
          icon={FileText}
          title="Entregables"
          value={String(deliverables.length)}
          tone="warning"
        />
        <MetricCard
          detail={`${assignments.length} asignaciones activas o historicas`}
          icon={CalendarClock}
          title="Asignaciones"
          value={String(assignments.length)}
          tone="success"
        />
        <MetricCard
          detail="Preparado para Qulqi"
          icon={HandCoins}
          title="Ingresos"
          value="S/ --"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ChartCard data={executionData} title="Ejecucion semanal" />

        <Card className="glass-panel rounded-lg">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>Actividad reciente</CardTitle>
              <BarChart3 className="size-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            {activity.length > 0 ? (
              <DataTable
                columns={[
                  { header: "Evento", accessor: "evento" },
                  { header: "Modulo", accessor: "modulo" },
                  { header: "Estado", accessor: "estado" },
                ]}
                data={activity}
              />
            ) : (
              <p className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                Aun no hay entregables recientes.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <DashboardSection
        description="Fase 6 conecta revision de entregables, feedback y asignaciones sin activar pagos ni desbloqueos avanzados."
        title="Gestion de revision"
      >
        <div className="grid gap-4 md:grid-cols-4">
          {["Usuarios", "Cursos", "Reportes"].map((item) => (
            <Card className="glass-panel rounded-lg" key={item}>
              <CardContent className="p-5">
              <StatusBadge status="Proxima fase" />
                <h3 className="mt-4 font-semibold">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Ruta creada y navegacion disponible para desarrollar la logica
                  funcional en la fase indicada.
                </p>
              </CardContent>
            </Card>
          ))}
          <Card className="glass-panel rounded-lg">
            <CardContent className="p-5">
              <StatusBadge status="Activo" />
              <h3 className="mt-4 font-semibold">Ciclo de feedback</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {approved} aprobados y {needsChanges} con ajustes solicitados o
                rechazo.
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardSection>
    </div>
  );
}
