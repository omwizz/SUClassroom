import { revalidatePath } from "next/cache";
import {
  COURSE_LEVELS,
  COURSE_STATUSES,
  type CourseLevel,
  type CourseStatus,
} from "@/constants/courses";
import { hasDatabaseUrl } from "@/db/client";
import { courseSchema } from "@/lib/validations/courses";
import { requireApiProfile } from "@/server/api/auth";
import { apiError, apiSuccess, readJsonBody } from "@/server/api/responses";
import {
  getAdminCourses,
  getPublishedCourses,
  insertCourse,
} from "@/server/queries/courses";

function asRecord(value: unknown) {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function asNumber(value: unknown, fallback = 0) {
  const parsed =
    typeof value === "number" ? value : Number.parseInt(asString(value), 10);

  return Number.isFinite(parsed) ? parsed : fallback;
}

function asBoolean(value: unknown, fallback = false) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return ["1", "true", "yes", "si"].includes(value.toLowerCase());
  }

  return fallback;
}

function resolveLevel(value: unknown): CourseLevel {
  return COURSE_LEVELS.includes(value as CourseLevel)
    ? (value as CourseLevel)
    : "beginner";
}

function resolveStatus(value: unknown): CourseStatus {
  return COURSE_STATUSES.includes(value as CourseStatus)
    ? (value as CourseStatus)
    : "draft";
}

export async function GET(request: Request) {
  const auth = await requireApiProfile(request);

  if (auth.ok && auth.profile.activeRole === "admin") {
    return apiSuccess(await getAdminCourses());
  }

  return apiSuccess(await getPublishedCourses());
}

export async function POST(request: Request) {
  const auth = await requireApiProfile(request, ["admin"]);

  if (!auth.ok) {
    return apiError(auth.message, { status: auth.status });
  }

  if (!hasDatabaseUrl()) {
    return apiError("DATABASE_URL no esta configurado.", { status: 503 });
  }

  const body = asRecord(await readJsonBody(request));

  if (!body) {
    return apiError("Envia un cuerpo JSON valido.", { status: 400 });
  }

  const parsed = courseSchema.safeParse({
    categoryId: asString(body.categoryId),
    title: asString(body.title),
    slug: asString(body.slug),
    subtitle: asString(body.subtitle),
    description: asString(body.description),
    objective: asString(body.objective),
    expectedResult: asString(body.expectedResult),
    targetAudience: asString(body.targetAudience),
    level: resolveLevel(body.level),
    status: resolveStatus(body.status),
    thumbnailUrl: asString(body.thumbnailUrl),
    estimatedDurationMinutes: asNumber(body.estimatedDurationMinutes),
    isFree: asBoolean(body.isFree),
    sortOrder: asNumber(body.sortOrder),
  });

  if (!parsed.success) {
    return apiError("Revisa los campos del curso.", {
      details: parsed.error.flatten().fieldErrors,
      status: 400,
    });
  }

  const course = await insertCourse(parsed.data, auth.profile.id);

  revalidatePath("/courses");
  revalidatePath("/dashboard/admin/courses");
  revalidatePath("/dashboard/student/courses");

  return apiSuccess(course, {
    message: "Curso creado.",
    status: 201,
  });
}
