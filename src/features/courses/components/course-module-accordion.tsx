import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LessonItem } from "@/features/courses/components/lesson-item";
import type { CourseModule } from "@/types/courses";

type CourseModuleAccordionProps = {
  modules: CourseModule[];
  courseSlug?: string;
  activeLessonSlug?: string;
};

export function CourseModuleAccordion({
  modules,
  courseSlug,
  activeLessonSlug,
}: CourseModuleAccordionProps) {
  if (modules.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        Este curso todavía no tiene módulos publicados.
      </div>
    );
  }

  return (
    <Accordion
      className="rounded-lg border border-border bg-card px-3"
      defaultValue={modules[0]?.id}
      type="single"
      collapsible
    >
      {modules.map((moduleItem) => (
        <AccordionItem key={moduleItem.id} value={moduleItem.id}>
          <AccordionTrigger className="hover:no-underline">
            <span>
              <span className="block font-semibold">{moduleItem.title}</span>
              <span className="text-xs text-muted-foreground">
                {moduleItem.lessons.length} lecciones
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {moduleItem.description ? (
                <p className="text-sm leading-6 text-muted-foreground">
                  {moduleItem.description}
                </p>
              ) : null}
              {moduleItem.lessons.map((lesson) => (
                <LessonItem
                  activeLessonSlug={activeLessonSlug}
                  courseSlug={courseSlug}
                  key={lesson.id}
                  lesson={lesson}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

