import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, LockKeyhole } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COURSE_PROGRESS_STATUS_LABELS } from "@/constants/progress";
import { CourseProgressBar } from "@/features/progress/components/course-progress-bar";
import { CourseLockedState } from "@/features/progress/components/course-locked-state";
import { CourseUnlockedState } from "@/features/progress/components/course-unlocked-state";
import { startCourseFromForm } from "@/server/actions/progress-actions";
import type { CourseProgressItem } from "@/types/progress";

type CourseProgressCardProps = {
  item: CourseProgressItem;
};

export function CourseProgressCard({ item }: CourseProgressCardProps) {
  const isLocked = item.status === "locked";
  const isAvailable = item.status === "available";
  const href = `/dashboard/student/courses/${item.course.slug}`;

  return (
    <Card className="min-h-full">
      <CardHeader>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant={isLocked ? "outline" : "secondary"}>
            {isLocked ? (
              <LockKeyhole className="size-3" />
            ) : item.status === "completed" ? (
              <CheckCircle2 className="size-3" />
            ) : (
              <BookOpen className="size-3" />
            )}
            {COURSE_PROGRESS_STATUS_LABELS[item.status]}
          </Badge>
          <Badge variant="outline">
            {item.completedLessons}/{item.totalRequiredLessons} lecciones
          </Badge>
        </div>
        <CardTitle>{item.course.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {item.course.subtitle ??
            item.course.description ??
            "Curso publicado de SUClassroom."}
        </p>
        {isLocked ? (
          <CourseLockedState state={item.unlockState} />
        ) : (
          <>
            <CourseProgressBar value={item.progressPercentage} />
            <CourseUnlockedState state={item.unlockState} />
          </>
        )}
      </CardContent>
      <CardFooter>
        {isLocked ? (
          <Button className="w-full" disabled variant="secondary">
            <LockKeyhole aria-hidden="true" />
            Bloqueado
          </Button>
        ) : isAvailable ? (
          <form
            action={startCourseFromForm.bind(null, {
              courseId: item.course.id,
            })}
            className="w-full"
          >
            <Button className="w-full" type="submit">
              Iniciar curso
              <ArrowRight aria-hidden="true" />
            </Button>
          </form>
        ) : (
          <Button asChild className="w-full">
            <Link href={href}>
              Continuar
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
