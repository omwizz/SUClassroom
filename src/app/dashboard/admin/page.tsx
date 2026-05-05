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
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

const activity = [
  { evento: "Registro de alumno", modulo: "Auth", estado: "Activo" },
  { evento: "Entregable enviado", modulo: "Entregables", estado: "Pendiente" },
  { evento: "Feedback emitido", modulo: "Mentor", estado: "Completado" },
];

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

  return (
    <div className="space-y-8">
      <PageHeader
        actions={<StatusBadge status="Próxima fase" />}
        description="Vista base para operar usuarios, cursos, entregables, mentorías, pagos y reportes."
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
          detail="Bandeja de ejecución"
          icon={FileText}
          title="Entregables"
          value="31"
          tone="warning"
        />
        <MetricCard
          detail="Agenda futura"
          icon={CalendarClock}
          title="Asesorías"
          value="9"
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
        <ChartCard data={executionData} title="Ejecución semanal" />

        <Card className="glass-panel rounded-lg">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>Actividad reciente</CardTitle>
              <BarChart3 className="size-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { header: "Evento", accessor: "evento" },
                { header: "Módulo", accessor: "modulo" },
                { header: "Estado", accessor: "estado" },
              ]}
              data={activity}
            />
          </CardContent>
        </Card>
      </div>

      <DashboardSection
        description="Estas superficies quedan listas para conectar CRUD y reportes en fases posteriores."
        title="Gestión inicial"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {["Usuarios", "Cursos", "Reportes"].map((item) => (
            <Card className="glass-panel rounded-lg" key={item}>
              <CardContent className="p-5">
                <StatusBadge status="Próxima fase" />
                <h3 className="mt-4 font-semibold">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Ruta creada y navegación disponible para desarrollar la lógica
                  funcional en la fase indicada.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
