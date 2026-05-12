import { z } from "zod";
import { requireApiProfile } from "@/server/api/auth";
import { apiError } from "@/server/api/responses";

type CourseRouteContext = {
  params: Promise<{
    courseId: string;
  }>;
};

export async function POST(request: Request, context: CourseRouteContext) {
  const auth = await requireApiProfile(request, ["student", "admin"]);

  if (!auth.ok) {
    return apiError(auth.message, { status: auth.status });
  }

  const { courseId } = await context.params;
  const parsed = z.uuid().safeParse(courseId);

  if (!parsed.success) {
    return apiError("courseId debe ser un UUID valido.", { status: 400 });
  }

  return apiError(
    "SUClassroom todavia no tiene una tabla de inscripciones por curso. El catalogo y el avance actual se gestionan con cursos publicados, proyectos y entregables.",
    { status: 501 },
  );
}
