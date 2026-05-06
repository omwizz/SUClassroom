import Link from "next/link";
import { CheckCircle2, Clock3, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Lesson } from "@/types/courses";

type LessonItemProps = {
  lesson: Lesson;
  courseSlug?: string;
  activeLessonSlug?: string;
};

export function LessonItem({
  lesson,
  courseSlug,
  activeLessonSlug,
}: LessonItemProps) {
  const active = activeLessonSlug === lesson.slug;
  const content = (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-border bg-background/50 p-3 text-sm transition-colors hover:bg-muted/40",
        active && "border-primary/50 bg-primary/10",
      )}
    >
      <PlayCircle className="mt-0.5 size-4 shrink-0 text-primary" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">{lesson.title}</span>
          {lesson.isPreview ? <Badge variant="secondary">Vista previa</Badge> : null}
          {lesson.isRequired ? (
            <Badge variant="outline">
              <CheckCircle2 className="size-3" />
              Requerida
            </Badge>
          ) : null}
        </div>
        {lesson.description ? (
          <p className="mt-1 line-clamp-2 text-muted-foreground">
            {lesson.description}
          </p>
        ) : null}
        <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Clock3 className="size-3.5" />
          {lesson.estimatedDurationMinutes} min
        </span>
      </div>
    </div>
  );

  if (!courseSlug) {
    return content;
  }

  return (
    <Link href={`/courses/${courseSlug}/lessons/${lesson.slug}`}>{content}</Link>
  );
}

