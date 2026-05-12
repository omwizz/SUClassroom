import { PageHeader } from "@/components/dashboard/page-header";
import { CourseFilters } from "@/features/courses/components/course-filters";
import { CourseProgressCard } from "@/features/progress/components/course-progress-card";
import { COURSE_LEVELS, type CourseLevel } from "@/constants/courses";
import { requireRole } from "@/server/guards/role-guard";
import {
  getCourseCategories,
  getPublishedCourses,
} from "@/server/queries/courses";
import { getStudentCourseProgress } from "@/server/queries/progress";

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
  const profile = await requireRole(["student", "admin"]);
  const params = await searchParams;
  const [categories, filteredCourses, progressItems] = await Promise.all([
    getCourseCategories(),
    getPublishedCourses({
      search: params.search,
      category: params.category,
      level: normalizeLevel(params.level),
    }),
    getStudentCourseProgress(profile.id),
  ]);
  const filteredIds = new Set(filteredCourses.map((course) => course.id));
  const items = progressItems.filter((item) => filteredIds.has(item.course.id));

  return (
    <div className="space-y-6">
      <PageHeader
        description="Cursos publicados con su estado de acceso, avance y siguiente accion."
        title="Cursos"
      />
      <CourseFilters categories={categories} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <CourseProgressCard item={item} key={item.course.id} />
        ))}
      </div>
    </div>
  );
}
