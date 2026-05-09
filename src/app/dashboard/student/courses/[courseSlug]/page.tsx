import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { CourseDetail } from "@/features/courses/components/course-detail";
import { CourseHeader } from "@/features/courses/components/course-header";
import { CourseModuleAccordion } from "@/features/courses/components/course-module-accordion";
import { requireRole } from "@/server/guards/role-guard";
import { getCourseBySlug } from "@/server/queries/courses";

export const dynamic = "force-dynamic";

type StudentCourseDetailPageProps = {
  params: Promise<{ courseSlug: string }>;
};

export default async function StudentCourseDetailPage({
  params,
}: StudentCourseDetailPageProps) {
  await requireRole(["student", "admin"]);
  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  const firstLesson = course.modules
    .flatMap((moduleItem) => moduleItem.lessons)
    .at(0);

  return (
    <div className="space-y-6">
      <CourseHeader backHref="/dashboard/student/courses" course={course} />
      <CourseDetail course={course} />
        <SectionCard
          actions={
            firstLesson ? (
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
    </div>
  );
}
