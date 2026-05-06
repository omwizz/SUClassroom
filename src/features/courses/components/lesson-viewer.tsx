import Link from "next/link";
import { ArrowLeft, Clock3, FileVideo, Type } from "lucide-react";
import { LESSON_TYPE_LABELS, VIDEO_PROVIDER_LABELS } from "@/constants/courses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { LessonResourceList } from "@/features/courses/components/lesson-resource-list";
import type { Course, Lesson } from "@/types/courses";

type LessonViewerProps = {
  course: Course;
  lesson: Lesson;
};

export function LessonViewer({ course, lesson }: LessonViewerProps) {
  return (
    <div className="space-y-6">
      <Button asChild size="sm" variant="ghost">
        <Link href={`/courses/${course.slug}`}>
          <ArrowLeft aria-hidden="true" />
          Volver al curso
        </Link>
      </Button>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="aspect-video rounded-lg border border-border bg-muted/30">
              {lesson.videoUrl ? (
                <div className="flex h-full items-center justify-center p-6 text-center">
                  <Button asChild>
                    <Link href={lesson.videoUrl} target="_blank">
                      <FileVideo aria-hidden="true" />
                      Abrir video
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center text-muted-foreground">
                  <Type className="mb-3 size-8 text-primary" />
                  <p className="text-sm">Lección de lectura y aplicación guiada</p>
                </div>
              )}
            </div>
          </div>

          <SectionCard title={lesson.title}>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge>{LESSON_TYPE_LABELS[lesson.lessonType]}</Badge>
              <Badge variant="outline">
                {VIDEO_PROVIDER_LABELS[lesson.videoProvider]}
              </Badge>
              <Badge variant="outline">
                <Clock3 className="size-3" />
                {lesson.estimatedDurationMinutes} min
              </Badge>
            </div>
            {lesson.description ? (
              <p className="mb-5 text-sm leading-7 text-muted-foreground">
                {lesson.description}
              </p>
            ) : null}
            <div className="space-y-4 text-sm leading-7 text-foreground/90">
              {(lesson.content ?? "Contenido en preparación.").split("\n").map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </SectionCard>
        </div>

        <aside className="space-y-4">
          <SectionCard
            description="Materiales asociados a esta lección."
            title="Recursos"
          >
            <LessonResourceList resources={lesson.resources} />
          </SectionCard>
        </aside>
      </section>
    </div>
  );
}

