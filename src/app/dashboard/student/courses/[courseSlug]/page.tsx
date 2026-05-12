import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, LockKeyhole, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { CourseDetail } from "@/features/courses/components/course-detail";
import { CourseHeader } from "@/features/courses/components/course-header";
import { CourseModuleAccordion } from "@/features/courses/components/course-module-accordion";
import { CourseLockedState } from "@/features/progress/components/course-locked-state";
import { CourseProgressBar } from "@/features/progress/components/course-progress-bar";
import { LessonProgressButton } from "@/features/progress/components/lesson-progress-button";
import { UnlockReasonCard } from "@/features/progress/components/unlock-reason-card";
import { startCourseFromForm } from "@/server/actions/progress-actions";
import { requireRole } from "@/server/guards/role-guard";
import { getCourseBySlug } from "@/server/queries/courses";
import {
  getCourseLessonProgress,
  getCourseProgressStatus,
} from "@/server/queries/progress";

export const dynamic = "force-dynamic";

type StudentCourseDetailPageProps = {
  params: Promise<{ courseSlug: string }>;
};

export default async function StudentCourseDetailPage({
  params,
}: StudentCourseDetailPageProps) {
  const profile = await requireRole(["student", "admin"]);
  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  const firstLesson = course.modules
    .flatMap((moduleItem) => moduleItem.lessons)
    .at(0);
  const [progressItem, lessonProgress] = await Promise.all([
    getCourseProgressStatus(profile.id, course.id),
    getCourseLessonProgress(profile.id, course.id),
  ]);
  const isLocked = progressItem?.status === "locked";
  const isAvailable = progressItem?.status === "available";

  return (
    <div className="space-y-6">
      <CourseHeader backHref="/dashboard/student/courses" course={course} />
      {progressItem ? (
        <UnlockReasonCard state={progressItem.unlockState} />
      ) : null}
      {isLocked && progressItem ? (
        <CourseLockedState state={progressItem.unlockState} />
      ) : null}
      {isLocked ? (
        <Button disabled>
          <LockKeyhole aria-hidden="true" />
          Curso bloqueado
        </Button>
      ) : isAvailable ? (
        <form action={startCourseFromForm.bind(null, { courseId: course.id })}>
          <Button type="submit">
            Iniciar curso
            <ArrowRight aria-hidden="true" />
          </Button>
        </form>
      ) : null}
      <CourseDetail course={course} />
      {progressItem ? (
        <SectionCard
          description={`${progressItem.completedLessons} de ${progressItem.totalRequiredLessons} lecciones obligatorias completadas.`}
          title="Avance del curso"
        >
          <CourseProgressBar value={progressItem.progressPercentage} />
        </SectionCard>
      ) : null}
      {!isLocked ? (
        <SectionCard
          actions={
            firstLesson && !isLocked ? (
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="secondary">
                <Link href={`/dashboard/student/deliverables/new?courseId=${course.id}`}>
                  <Send aria-hidden="true" />
                  Preparar entregable
                </Link>
              </Button>
              <Button asChild>
                <Link href={`/courses/${course.slug}/lessons/${firstLesson.slug}`}>
                  Continuar
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          ) : null
        }
        description="Puedes revisar el contenido publicado y sus recursos."
        title="Ruta de aprendizaje"
      >
        <CourseModuleAccordion courseSlug={course.slug} modules={course.modules} />
        </SectionCard>
      ) : null}
      {!isLocked ? (
        <SectionCard
          description="Marcar una leccion actualiza el porcentaje, pero el curso se completa cuando el entregable requerido es aprobado."
          title="Progreso por leccion"
        >
          <div className="grid gap-3 md:grid-cols-2">
            {lessonProgress.map((item) => (
              <div
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4"
                key={item.lesson.id}
              >
                <div>
                  <p className="font-medium">{item.lesson.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.lesson.estimatedDurationMinutes} min
                  </p>
                </div>
                <LessonProgressButton
                  completed={item.status === "completed"}
                  courseId={course.id}
                  lessonId={item.lesson.id}
                />
              </div>
            ))}
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}
