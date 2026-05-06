import { notFound } from "next/navigation";
import { LessonViewer } from "@/features/courses/components/lesson-viewer";
import { getCourseBySlug } from "@/server/queries/courses";

export const dynamic = "force-dynamic";

type LessonPageProps = {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseSlug, lessonSlug } = await params;
  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  const lesson = course.modules
    .flatMap((moduleItem) => moduleItem.lessons)
    .find((item) => item.slug === lessonSlug);

  if (!lesson) {
    notFound();
  }

  return (
    <main className="min-h-dvh bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <LessonViewer course={course} lesson={lesson} />
      </div>
    </main>
  );
}

