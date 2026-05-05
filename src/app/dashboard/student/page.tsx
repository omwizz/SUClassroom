import {
  BookOpen,
  CalendarClock,
  ClipboardCheck,
  FileText,
  MessageSquareText,
  Target,
} from "lucide-react";
import { ActionCard } from "@/components/dashboard/action-card";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { ProgressBar } from "@/components/shared/progress-bar";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const profile = await requireRole(["student", "admin"]);
  const name = profile.fullName?.split(" ")[0] ?? "Alumno";

  return (
    <div className="space-y-8">
      <PageHeader
        description="Avanza por una ruta donde cada aprendizaje termina en una acción concreta."
        eyebrow="Dashboard alumno"
        title={`Bienvenido, ${name}`}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          detail="Placeholder hasta conectar progreso real"
          icon={Target}
          title="Progreso general"
          value="42%"
        />
        <MetricCard
          detail="Curso gratuito inicial"
          icon={BookOpen}
          title="Curso actual"
          value="1"
          tone="info"
        />
        <MetricCard
          detail="Evidencia pendiente de envío"
          icon={FileText}
          title="Entregable"
          value="1"
          tone="warning"
        />
        <MetricCard
          detail="Sesión preparada para fase futura"
          icon={CalendarClock}
          title="Próxima asesoría"
          value="--"
          tone="success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="glass-panel rounded-lg">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>Curso actual</CardTitle>
              <StatusBadge status="En revisión" />
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold">
                Validación inicial del proyecto
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Placeholder del primer curso gratuito. En la Fase 3 se conectará
                al catálogo, módulos, lecciones y recursos.
              </p>
            </div>
            <ProgressBar label="Avance del curso" value={42} />
          </CardContent>
        </Card>

        <Card className="glass-panel rounded-lg">
          <CardHeader>
            <CardTitle>Próximos pasos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Completar diagnóstico inicial",
              "Estructurar hipótesis del proyecto",
              "Preparar entregable para revisión",
            ].map((item, index) => (
              <div
                className="flex items-center gap-3 rounded-md border border-border bg-muted/20 p-3 text-sm"
                key={item}
              >
                <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 font-mono text-xs text-primary">
                  {index + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <DashboardSection
        description="Accesos rápidos preparados para conectar las fases siguientes."
        title="Acciones"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <ActionCard
            description="Vista placeholder para el catálogo y el detalle del curso."
            href="/dashboard/student/courses"
            icon={BookOpen}
            title="Ver cursos"
          />
          <ActionCard
            description="Espacio base para el proyecto real del alumno."
            href="/dashboard/student/project"
            icon={ClipboardCheck}
            title="Mi proyecto"
          />
          <ActionCard
            description="Consulta las observaciones del mentor cuando existan."
            href="/dashboard/student/feedback"
            icon={MessageSquareText}
            title="Feedback"
          />
        </div>
      </DashboardSection>
    </div>
  );
}
