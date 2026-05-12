import { BookOpen, CheckCircle2, LockKeyhole, TrendingUp } from "lucide-react";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { CourseProgressCard } from "@/features/progress/components/course-progress-card";
import { NextStepCard } from "@/features/progress/components/next-step-card";
import { StudentProgressTimeline } from "@/features/progress/components/student-progress-timeline";
import { requireRole } from "@/server/guards/role-guard";
import {
  getStudentCourseProgress,
  getStudentProgressEvents,
  getStudentProgressSummary,
} from "@/server/queries/progress";
import { NextStepService } from "@/server/services/next-step-service";

export const dynamic = "force-dynamic";

export default async function StudentProgressPage() {
  const profile = await requireRole(["student", "admin"]);
  const [items, summary, events] = await Promise.all([
    getStudentCourseProgress(profile.id),
    getStudentProgressSummary(profile.id),
    getStudentProgressEvents(profile.id),
  ]);
  const nextStep = NextStepService.fromProgressSummary(summary);

  return (
    <div className="space-y-6">
      <PageHeader
        description="Consulta cursos disponibles, bloqueos, lecciones completadas y eventos de avance."
        eyebrow="Alumno"
        title="Mi progreso"
      />

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          detail="Promedio de cursos publicados"
          icon={TrendingUp}
          title="Avance"
          value={`${summary.averageProgress}%`}
        />
        <MetricCard
          detail="Listos para iniciar o continuar"
          icon={BookOpen}
          title="Disponibles"
          value={String(summary.availableCourses)}
          tone="info"
        />
        <MetricCard
          detail="Esperan regla o requisito"
          icon={LockKeyhole}
          title="Bloqueados"
          value={String(summary.lockedCourses)}
          tone="warning"
        />
        <MetricCard
          detail="Con entregable aprobado"
          icon={CheckCircle2}
          title="Completados"
          value={String(summary.completedCourses)}
          tone="success"
        />
      </div>

      <NextStepCard step={nextStep} />

      <DashboardSection
        description="Cada tarjeta explica el estado actual y el motivo del bloqueo cuando aplica."
        title="Ruta de cursos"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <CourseProgressCard item={item} key={item.course.id} />
          ))}
        </div>
      </DashboardSection>

      <SectionCard
        description="Historial basico generado por acciones de curso, leccion, entregable y desbloqueo."
        title="Actividad reciente"
      >
        <StudentProgressTimeline events={events} />
      </SectionCard>
    </div>
  );
}
