import Link from "next/link";
import {
  BookOpen,
  Compass,
  FileText,
  FolderKanban,
  MessageSquareText,
  Target,
  TrendingUp,
} from "lucide-react";
import { ActionCard } from "@/components/dashboard/action-card";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { BUSINESS_AREA_LABELS, PROJECT_STAGE_LABELS } from "@/constants/projects";
import { NextStepCard } from "@/features/projects/components/next-step-card";
import { ProjectStageBadge } from "@/features/projects/components/project-stage-badge";
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge";
import { ProjectSummaryCard } from "@/features/projects/components/project-summary-card";
import { StudentProjectPanel } from "@/features/projects/components/student-project-panel";
import { requireRole } from "@/server/guards/role-guard";
import {
  findCurrentStudentProject,
  findStudentOnboarding,
} from "@/server/queries/projects";
import { getStudentDeliverables } from "@/server/queries/deliverables";
import { getStudentFeedback } from "@/server/queries/evaluations";
import { getStudentProgressSummary } from "@/server/queries/progress";
import { OnboardingService } from "@/server/services/onboarding-service";
import { NextStepService } from "@/server/services/next-step-service";
import { StudentProjectService } from "@/server/services/student-project-service";
import { NextStepCard as ProgressNextStepCard } from "@/features/progress/components/next-step-card";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const profile = await requireRole(["student", "admin"]);
  const name = profile.fullName?.split(" ")[0] ?? "Alumno";
  const [onboarding, project, deliverables, feedback, progressSummary] =
    await Promise.all([
    findStudentOnboarding(profile.id),
    findCurrentStudentProject(profile.id),
    getStudentDeliverables(profile.id),
    getStudentFeedback(profile.id),
    getStudentProgressSummary(profile.id),
  ]);
  const latestDeliverable = deliverables.at(0);
  const latestFeedback = feedback.at(0);
  const nextStep = project
    ? StudentProjectService.nextStep(project)
    : OnboardingService.nextDashboardStep(onboarding);
  const suggestedCourseSlug = project
    ? StudentProjectService.suggestedCourseSlug(
        project.businessArea,
        project.currentStage,
      )
    : "de-la-idea-a-la-validacion-inicial";
  const progressNextStep = NextStepService.fromProgressSummary(progressSummary);

  return (
    <div className="space-y-8">
      <PageHeader
        description="Tu ruta empieza con diagnostico, proyecto y un siguiente paso concreto para aprender aplicando."
        eyebrow="Dashboard alumno"
        title={`Bienvenido, ${name}`}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard
          detail="Diagnostico inicial completado"
          icon={Target}
          title="Onboarding"
          value={onboarding ? "Listo" : "Pendiente"}
        />
        <MetricCard
          detail={project ? PROJECT_STAGE_LABELS[project.currentStage] : "Sin etapa"}
          icon={FolderKanban}
          title="Proyecto"
          value={project ? "Activo" : "Sin ficha"}
          tone="info"
        />
        <MetricCard
          detail={
            project ? BUSINESS_AREA_LABELS[project.businessArea] : "Por definir"
          }
          icon={Compass}
          title="Area foco"
          value={project ? "Definida" : "--"}
          tone="warning"
        />
        <MetricCard
          detail="Curso inicial recomendado"
          icon={BookOpen}
          title="Siguiente curso"
          value={String(progressSummary.availableCourses)}
          tone="success"
        />
        <MetricCard
          detail="Promedio de la ruta"
          icon={TrendingUp}
          title="Progreso"
          value={`${progressSummary.averageProgress}%`}
          tone="info"
        />
        <MetricCard
          detail={latestDeliverable?.title ?? "Sin evidencia enviada"}
          icon={FileText}
          title="Entregables"
          value={String(deliverables.length)}
          tone="info"
        />
        <MetricCard
          detail={latestFeedback?.summary ?? "Sin feedback recibido"}
          icon={MessageSquareText}
          title="Feedback"
          value={String(feedback.length)}
          tone="success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {project ? (
          <ProjectSummaryCard project={project} />
        ) : (
          <StudentProjectPanel project={null} />
        )}
        <div className="space-y-4">
          <NextStepCard {...nextStep} />
          <ProgressNextStepCard step={progressNextStep} />
        </div>
      </div>

      {project ? (
        <div className="flex flex-wrap gap-2">
          <ProjectStatusBadge status={project.status} />
          <ProjectStageBadge stage={project.currentStage} />
          <Button asChild>
            <Link href={`/dashboard/student/courses/${suggestedCourseSlug}`}>
              Continuar con mi primer curso
            </Link>
          </Button>
        </div>
      ) : null}

      <DashboardSection
        description="Accesos principales para aprender, documentar evidencia y mantener tu proyecto en movimiento."
        title="Acciones"
      >
        <div className="grid gap-4 md:grid-cols-4">
          <ActionCard
            description="Explora el catalogo creado en la fase anterior."
            href="/dashboard/student/courses"
            icon={BookOpen}
            title="Ver cursos"
          />
          <ActionCard
            description="Consulta desbloqueos, avance y actividad reciente."
            href="/dashboard/student/progress"
            icon={TrendingUp}
            title="Mi progreso"
          />
          <ActionCard
            description="Consulta o edita la ficha inicial de tu proyecto."
            href="/dashboard/student/project"
            icon={FolderKanban}
            title="Mi proyecto"
          />
          <ActionCard
            description="Crea borradores, adjunta evidencia y envia avances."
            href="/dashboard/student/deliverables"
            icon={FileText}
            title="Entregables"
          />
          <ActionCard
            description="Revisa observaciones del mentor y siguientes pasos."
            href="/dashboard/student/feedback"
            icon={MessageSquareText}
            title="Feedback"
          />
        </div>
      </DashboardSection>
    </div>
  );
}
