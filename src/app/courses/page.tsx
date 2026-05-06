import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { CourseFilters } from "@/features/courses/components/course-filters";
import { CourseGrid } from "@/features/courses/components/course-grid";
import { COURSE_LEVELS, type CourseLevel } from "@/constants/courses";
import {
  getCourseCategories,
  getPublishedCourses,
} from "@/server/queries/courses";

export const dynamic = "force-dynamic";

type CoursesPageProps = {
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

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const filters = {
    search: params.search,
    category: params.category,
    level: normalizeLevel(params.level),
  };
  const [categories, courses] = await Promise.all([
    getCourseCategories(),
    getPublishedCourses(filters),
  ]);

  return (
    <main className="min-h-dvh bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHeader
          actions={
            <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
              <BookOpen className="size-4 text-primary" />
              {courses.length} cursos visibles
            </div>
          }
          description="Explora cursos publicados y empieza por el demo gratuito para validar una idea con evidencia."
          eyebrow="Catálogo"
          title="Cursos SUClassroom"
        />
        <CourseFilters categories={categories} />
        <CourseGrid courses={courses} />
      </div>
    </main>
  );
}

