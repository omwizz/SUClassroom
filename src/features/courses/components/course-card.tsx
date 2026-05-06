import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Layers3,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseLevelBadge } from "@/features/courses/components/course-level-badge";
import type { Course } from "@/types/courses";

type CourseCardProps = {
  course: Course;
  hrefBase?: string;
};

export function CourseCard({ course, hrefBase = "/courses" }: CourseCardProps) {
  const lessonCount = course.modules.reduce(
    (total, moduleItem) => total + moduleItem.lessons.length,
    0,
  );
  const href = `${hrefBase}/${course.slug}`;

  return (
    <Card className="min-h-full">
      <div className="mx-4 mt-4 overflow-hidden rounded-lg border border-white/10 bg-muted/30">
        <div className="relative h-36 bg-[linear-gradient(135deg,oklch(0.42_0.16_238),oklch(0.25_0.05_250))] p-4">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(oklch(1_0_0/0.13)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/0.13)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative flex h-full flex-col justify-between">
            <Badge className="w-fit" variant={course.isFree ? "default" : "outline"}>
              {course.isFree ? (
                <Sparkles className="size-3" />
              ) : (
                <LockKeyhole className="size-3" />
              )}
              {course.isFree ? "Curso gratuito" : "Curso privado"}
            </Badge>
            <BookOpen className="size-9 text-white/80" />
          </div>
        </div>
      </div>
      <CardHeader>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <CourseLevelBadge level={course.level} />
          {course.category ? (
            <Badge variant="outline">{course.category.name}</Badge>
          ) : null}
        </div>
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {course.subtitle ?? course.description ?? "Curso publicado de SUClassroom."}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Clock3 className="size-4" />
            {course.estimatedDurationMinutes} min
          </span>
          <span className="inline-flex items-center gap-2">
            <Layers3 className="size-4" />
            {lessonCount} lecciones
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href}>
            Ver curso
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

