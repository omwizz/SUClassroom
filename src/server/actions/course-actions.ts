"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { hasDatabaseUrl } from "@/db/client";
import {
  courseCategorySchema,
  courseModuleSchema,
  courseSchema,
  lessonResourceSchema,
  lessonSchema,
  reorderCourseModulesSchema,
  reorderLessonsSchema,
  type CourseCategoryInput,
  type CourseInput,
  type CourseModuleInput,
  type LessonInput,
  type LessonResourceInput,
} from "@/lib/validations/courses";
import { getCurrentProfile } from "@/server/actions/auth-actions";
import {
  deactivateCourseCategoryById,
  deleteCourseModuleById,
  deleteLessonById,
  deleteLessonResourceById,
  insertCourse,
  insertCourseCategory,
  insertCourseModule,
  insertLesson,
  insertLessonResource,
  setCourseStatus,
  updateCourseById,
  updateCourseCategoryById,
  updateCourseModuleById,
  updateCourseModuleOrder,
  updateLessonById,
  updateLessonOrder,
  updateLessonResourceById,
} from "@/server/queries/courses";
import type { CourseActionState } from "@/types/courses";

const uuidSchema = z.uuid();

function validationError(error: z.ZodError): CourseActionState {
  return {
    ok: false,
    message: "Revisa los campos marcados.",
    fieldErrors: error.flatten().fieldErrors,
  };
}

function databaseMissing(): CourseActionState {
  return {
    ok: false,
    message:
      "DATABASE_URL no está configurado. Puedes revisar el demo publicado, pero las mutaciones requieren base de datos.",
  };
}

function actionError(error: unknown): CourseActionState {
  return {
    ok: false,
    message:
      error instanceof Error
        ? error.message
        : "No se pudo completar la acción.",
  };
}

async function requireAdminAction() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return {
      profile: null,
      error: {
        ok: false,
        message: "Inicia sesión para administrar cursos.",
      } satisfies CourseActionState,
    };
  }

  if (profile.activeRole !== "admin") {
    return {
      profile: null,
      error: {
        ok: false,
        message: "No tienes permisos para administrar cursos.",
      } satisfies CourseActionState,
    };
  }

  return { profile, error: null };
}

async function guardMutation() {
  const auth = await requireAdminAction();

  if (auth.error) {
    return auth;
  }

  if (!hasDatabaseUrl()) {
    return {
      profile: null,
      error: databaseMissing(),
    };
  }

  return auth;
}

function revalidateCourseSurfaces(slug?: string) {
  revalidatePath("/courses");
  revalidatePath("/dashboard/admin/courses");
  revalidatePath("/dashboard/student/courses");

  if (slug) {
    revalidatePath(`/courses/${slug}`);
    revalidatePath(`/dashboard/student/courses/${slug}`);
  }
}

export async function createCourseCategory(
  input: CourseCategoryInput,
): Promise<CourseActionState> {
  const parsed = courseCategorySchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const category = await insertCourseCategory(parsed.data);
    revalidateCourseSurfaces();
    return {
      ok: true,
      message: "Categoría creada.",
      entityId: category.id,
      slug: category.slug,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateCourseCategory(
  input: CourseCategoryInput & { id: string },
): Promise<CourseActionState> {
  const parsed = courseCategorySchema.extend({ id: z.uuid() }).safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const category = await updateCourseCategoryById(parsed.data);
    revalidateCourseSurfaces();
    return {
      ok: Boolean(category),
      message: category ? "Categoría actualizada." : "Categoría no encontrada.",
      entityId: category?.id,
      slug: category?.slug,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function deactivateCourseCategory(
  categoryId: string,
): Promise<CourseActionState> {
  const parsed = uuidSchema.safeParse(categoryId);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    await deactivateCourseCategoryById(parsed.data);
    revalidateCourseSurfaces();
    return { ok: true, message: "Categoría desactivada." };
  } catch (error) {
    return actionError(error);
  }
}

export async function createCourse(
  input: CourseInput,
): Promise<CourseActionState> {
  const parsed = courseSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const course = await insertCourse(parsed.data, guard.profile.id);
    revalidateCourseSurfaces(course.slug);
    return {
      ok: true,
      message: "Curso creado.",
      entityId: course.id,
      slug: course.slug,
      redirectTo: `/dashboard/admin/courses/${course.id}/builder`,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateCourse(
  input: CourseInput & { id: string },
): Promise<CourseActionState> {
  const parsed = courseSchema.extend({ id: z.uuid() }).safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const course = await updateCourseById(parsed.data);
    revalidateCourseSurfaces(course?.slug);
    return {
      ok: Boolean(course),
      message: course ? "Curso actualizado." : "Curso no encontrado.",
      entityId: course?.id,
      slug: course?.slug,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function publishCourse(courseId: string): Promise<CourseActionState> {
  return updateCourseStatus(courseId, "published", "Curso publicado.");
}

export async function unpublishCourse(
  courseId: string,
): Promise<CourseActionState> {
  return updateCourseStatus(courseId, "draft", "Curso retirado del catálogo.");
}

export async function archiveCourse(courseId: string): Promise<CourseActionState> {
  return updateCourseStatus(courseId, "archived", "Curso archivado.");
}

async function updateCourseStatus(
  courseId: string,
  status: "draft" | "published" | "archived",
  message: string,
) {
  const parsed = uuidSchema.safeParse(courseId);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const course = await setCourseStatus(parsed.data, status);
    revalidateCourseSurfaces(course?.slug);
    return {
      ok: Boolean(course),
      message: course ? message : "Curso no encontrado.",
      entityId: course?.id,
      slug: course?.slug,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function createCourseModule(
  input: CourseModuleInput,
): Promise<CourseActionState> {
  const parsed = courseModuleSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const moduleItem = await insertCourseModule(parsed.data);
    revalidateCourseSurfaces();
    return {
      ok: true,
      message: "Módulo creado.",
      entityId: moduleItem.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateCourseModule(
  input: CourseModuleInput & { id: string },
): Promise<CourseActionState> {
  const parsed = courseModuleSchema.extend({ id: z.uuid() }).safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const moduleItem = await updateCourseModuleById(parsed.data);
    revalidateCourseSurfaces();
    return {
      ok: Boolean(moduleItem),
      message: moduleItem ? "Módulo actualizado." : "Módulo no encontrado.",
      entityId: moduleItem?.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteCourseModule(
  moduleId: string,
): Promise<CourseActionState> {
  const parsed = uuidSchema.safeParse(moduleId);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    await deleteCourseModuleById(parsed.data);
    revalidateCourseSurfaces();
    return { ok: true, message: "Módulo eliminado." };
  } catch (error) {
    return actionError(error);
  }
}

export async function reorderCourseModules(
  courseId: string,
  moduleIds: string[],
): Promise<CourseActionState> {
  const parsed = reorderCourseModulesSchema.safeParse({ courseId, moduleIds });

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    await updateCourseModuleOrder(parsed.data.moduleIds);
    revalidateCourseSurfaces();
    return { ok: true, message: "Orden de módulos actualizado." };
  } catch (error) {
    return actionError(error);
  }
}

export async function createLesson(
  input: LessonInput,
): Promise<CourseActionState> {
  const parsed = lessonSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const lesson = await insertLesson(parsed.data);
    revalidateCourseSurfaces();
    return {
      ok: true,
      message: "Lección creada.",
      entityId: lesson.id,
      slug: lesson.slug,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateLesson(
  input: LessonInput & { id: string },
): Promise<CourseActionState> {
  const parsed = lessonSchema.extend({ id: z.uuid() }).safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const lesson = await updateLessonById(parsed.data);
    revalidateCourseSurfaces();
    return {
      ok: Boolean(lesson),
      message: lesson ? "Lección actualizada." : "Lección no encontrada.",
      entityId: lesson?.id,
      slug: lesson?.slug,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteLesson(lessonId: string): Promise<CourseActionState> {
  const parsed = uuidSchema.safeParse(lessonId);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    await deleteLessonById(parsed.data);
    revalidateCourseSurfaces();
    return { ok: true, message: "Lección eliminada." };
  } catch (error) {
    return actionError(error);
  }
}

export async function reorderLessons(
  moduleId: string,
  lessonIds: string[],
): Promise<CourseActionState> {
  const parsed = reorderLessonsSchema.safeParse({ moduleId, lessonIds });

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    await updateLessonOrder(parsed.data.lessonIds);
    revalidateCourseSurfaces();
    return { ok: true, message: "Orden de lecciones actualizado." };
  } catch (error) {
    return actionError(error);
  }
}

export async function createLessonResource(
  input: LessonResourceInput,
): Promise<CourseActionState> {
  const parsed = lessonResourceSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const resource = await insertLessonResource(parsed.data);
    revalidateCourseSurfaces();
    return {
      ok: true,
      message: "Recurso creado.",
      entityId: resource.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateLessonResource(
  input: LessonResourceInput & { id: string },
): Promise<CourseActionState> {
  const parsed = lessonResourceSchema.extend({ id: z.uuid() }).safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    const resource = await updateLessonResourceById(parsed.data);
    revalidateCourseSurfaces();
    return {
      ok: Boolean(resource),
      message: resource ? "Recurso actualizado." : "Recurso no encontrado.",
      entityId: resource?.id,
    };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteLessonResource(
  resourceId: string,
): Promise<CourseActionState> {
  const parsed = uuidSchema.safeParse(resourceId);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const guard = await guardMutation();

  if (guard.error) {
    return guard.error;
  }

  try {
    await deleteLessonResourceById(parsed.data);
    revalidateCourseSurfaces();
    return { ok: true, message: "Recurso eliminado." };
  } catch (error) {
    return actionError(error);
  }
}

