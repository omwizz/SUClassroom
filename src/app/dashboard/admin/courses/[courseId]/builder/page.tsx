import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { CourseBuilder } from "@/features/courses/components/course-builder";
import { CourseStatusBadge } from "@/features/courses/components/course-status-badge";
import { requireRole } from "@/server/guards/role-guard";
import { getCourseById } from "@/server/queries/courses";

export const dynamic = "force-dynamic";

type BuilderPageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function CourseBuilderPage({ params }: BuilderPageProps) {
  await requireRole(["admin"]);
  const { courseId } = await params;
  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        actions={<CourseStatusBadge status={course.status} />}
        description="Construye módulos, lecciones y recursos del curso sin avanzar a flujos de entregables."
        title={`Builder: ${course.title}`}
      />
      <CourseBuilder course={course} />
    </div>
  );
}

