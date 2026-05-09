import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { CourseDetail } from "@/features/courses/components/course-detail";
import { CourseHeader } from "@/features/courses/components/course-header";
import { CourseModuleAccordion } from "@/features/courses/components/course-module-accordion";
import { getCourseBySlug } from "@/server/queries/courses";

export const dynamic = "force-dynamic";

type CoursePageProps = {
  params: Promise<{ courseSlug: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  const firstLesson = course.modules
    .flatMap((moduleItem) => moduleItem.lessons)
    .at(0);

  return (
    <main className="min-h-dvh bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <CourseHeader course={course} />
        <CourseDetail course={course} />
        <SectionCard
          actions={
            firstLesson ? (
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="secondary">
                  <Link href="/login">
                    <Send aria-hidden="true" />
                    Preparar entregable
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/courses/${course.slug}/lessons/${firstLesson.slug}`}>
                    Empezar
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            ) : null
          }
          description="La estructura está ordenada para aprender, aplicar y preparar evidencia."
          title="Módulos y lecciones"
        >
          <CourseModuleAccordion courseSlug={course.slug} modules={course.modules} />
        </SectionCard>
      </div>
    </main>
  );
}
