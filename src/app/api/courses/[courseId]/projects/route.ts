import { z } from "zod";
import { requireApiProfile } from "@/server/api/auth";
import { apiError } from "@/server/api/responses";

type CourseRouteContext = {
  params: Promise<{
    courseId: string;
  }>;
};

async function validateCourseRequest(request: Request, context: CourseRouteContext) {
  const auth = await requireApiProfile(request, ["student", "mentor", "admin"]);

  if (!auth.ok) {
    return {
      ok: false as const,
      response: apiError(auth.message, { status: auth.status }),
    };
  }

  const { courseId } = await context.params;
  const parsed = z.uuid().safeParse(courseId);

  if (!parsed.success) {
    return {
      ok: false as const,
      response: apiError("courseId debe ser un UUID valido.", { status: 400 }),
    };
  }

  return {
    ok: true as const,
  };
}

export async function GET(request: Request, context: CourseRouteContext) {
  const validated = await validateCourseRequest(request, context);

  if (!validated.ok) {
    return validated.response;
  }

  return apiError(
    "SUClassroom no relaciona proyectos directamente con cursos en esta fase. Usa /api/projects para proyectos y entregables para evidencias por curso.",
    { status: 501 },
  );
}

export async function POST(request: Request, context: CourseRouteContext) {
  const validated = await validateCourseRequest(request, context);

  if (!validated.ok) {
    return validated.response;
  }

  return apiError(
    "La creacion de proyectos por curso no aplica a la arquitectura actual. Crea o actualiza el proyecto principal con POST /api/projects.",
    { status: 501 },
  );
}
