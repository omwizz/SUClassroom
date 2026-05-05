import { BarChart3, BookOpen, ClipboardCheck, FolderKanban, Users } from "lucide-react";
import { ActionCard } from "@/components/dashboard/action-card";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { ProgressBar } from "@/components/shared/progress-bar";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function InstitutionDashboardPage() {
  await requireRole(["institution", "admin"]);

  return (
    <div className="space-y-8">
      <PageHeader
        description="Vista corporativa base para cohortes, participantes, avance e impacto."
        eyebrow="Dashboard institución"
        title="Seguimiento institucional"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          detail="Cohortes se conectan en Fase 10"
          icon={Users}
          title="Cohortes"
          value="2"
        />
        <MetricCard
          detail="Participantes placeholder"
          icon={BookOpen}
          title="Participantes"
          value="68"
          tone="info"
        />
        <MetricCard
          detail="Métrica inicial de cohorte"
          icon={ClipboardCheck}
          title="Avance promedio"
          value="37%"
          tone="success"
        />
        <MetricCard
          detail="Por aprobación futura"
          icon={FolderKanban}
          title="Proyectos aprobados"
          value="--"
          tone="warning"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="glass-panel rounded-lg">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>Avance por cohorte</CardTitle>
              <StatusBadge status="Próxima fase" />
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <ProgressBar label="Emprendimientos iniciales" value={44} />
            <ProgressBar label="Liderazgo social" value={31} />
            <ProgressBar label="Validación de mercado" value={18} />
          </CardContent>
        </Card>

        <DashboardSection title="Reportes institucionales">
          <ActionCard
            description="Base para reportes de avance e impacto por cohorte."
            href="/dashboard/institution/reports"
            icon={BarChart3}
            title="Ver reportes"
          />
        </DashboardSection>
      </div>
    </div>
  );
}
