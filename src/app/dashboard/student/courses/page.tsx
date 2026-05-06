import { PageHeader } from "@/components/dashboard/page-header";
import { CourseFilters } from "@/features/courses/components/course-filters";
import { CourseGrid } from "@/features/courses/components/course-grid";
import { COURSE_LEVELS, type CourseLevel } from "@/constants/courses";
import { requireRole } from "@/server/guards/role-guard";
import {
  getCourseCategories,
  getPublishedCourses,
} from "@/server/queries/courses";

export const dynamic = "force-dynamic";

type StudentCoursesPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    level?: string;
  }>;
};

function normalizeLevel(level?: string): CourseLevel | "all" {
  return COURSE_LEVELS.includes(level as CourseLevel)
    ? (level as CourseLevel)
    : "all";
}

export default async function StudentCoursesPage({
  searchParams,
}: StudentCoursesPageProps) {
  await requireRole(["student", "admin"]);
  const params = await searchParams;
  const [categories, courses] = await Promise.all([
    getCourseCategories(),
    getPublishedCourses({
      search: params.search,
      category: params.category,
      level: normalizeLevel(params.level),
    }),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        description="Cursos publicados disponibles para aprender y aplicar en proyectos reales."
        title="Cursos"
      />
      <CourseFilters categories={categories} />
      <CourseGrid courses={courses} hrefBase="/dashboard/student/courses" />
    </div>
  );
}

