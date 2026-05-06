import Link from "next/link";
import { ArrowLeft, Clock3, Layers3, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseLevelBadge } from "@/features/courses/components/course-level-badge";
import type { Course } from "@/types/courses";

type CourseHeaderProps = {
  course: Course;
  backHref?: string;
};

export function CourseHeader({ course, backHref = "/courses" }: CourseHeaderProps) {
  const lessonCount = course.modules.reduce(
    (total, moduleItem) => total + moduleItem.lessons.length,
    0,
  );

  return (
    <section className="relative overflow-hidden rounded-lg border border-border bg-card p-6">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(oklch(1_0_0/0.08)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/0.08)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="relative">
        <Button asChild size="sm" variant="ghost">
          <Link href={backHref}>
            <ArrowLeft aria-hidden="true" />
            Volver
          </Link>
        </Button>
        <div className="mt-6 max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <CourseLevelBadge level={course.level} />
            {course.category ? (
              <Badge variant="outline">{course.category.name}</Badge>
            ) : null}
            {course.isFree ? (
              <Badge>
                <Sparkles className="size-3" />
                Gratuito
              </Badge>
            ) : null}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            {course.title}
          </h1>
          {course.subtitle ? (
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              {course.subtitle}
            </p>
          ) : null}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2">
            <Clock3 className="size-4 text-primary" />
            {course.estimatedDurationMinutes} minutos
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2">
            <Layers3 className="size-4 text-primary" />
            {course.modules.length} módulos, {lessonCount} lecciones
          </span>
        </div>
      </div>
    </section>
  );
}

