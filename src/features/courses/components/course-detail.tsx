import { CheckCircle2, Target, Users } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";
import type { Course } from "@/types/courses";

type CourseDetailProps = {
  course: Course;
};

export function CourseDetail({ course }: CourseDetailProps) {
  const details = [
    {
      title: "Objetivo",
      description: course.objective,
      icon: Target,
    },
    {
      title: "Resultado esperado",
      description: course.expectedResult,
      icon: CheckCircle2,
    },
    {
      title: "Para quién",
      description: course.targetAudience,
      icon: Users,
    },
  ].filter((item) => item.description);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <SectionCard title="Descripción del curso">
        <p className="text-sm leading-7 text-muted-foreground">
          {course.description ??
            "Este curso está diseñado para aprender aplicando y avanzar con evidencia."}
        </p>
      </SectionCard>
      <div className="space-y-3">
        {details.map((item) => (
          <div
            className="rounded-lg border border-border bg-card p-4"
            key={item.title}
          >
            <item.icon className="mb-3 size-5 text-primary" />
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

