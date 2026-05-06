import { z } from "zod";
import {
  COURSE_LEVELS,
  COURSE_STATUSES,
  LESSON_TYPES,
  RESOURCE_TYPES,
  VIDEO_PROVIDERS,
} from "@/constants/courses";

const optionalShortText = z.string().trim().max(240);
const optionalLongText = z.string().trim().max(4000);
const optionalUrl = z
  .string()
  .trim()
  .refine((value) => value === "" || /^https?:\/\//i.test(value), {
    message: "Usa una URL válida que empiece con http:// o https://.",
  });

const idOrEmpty = z
  .string()
  .trim()
  .refine((value) => value === "" || z.uuid().safeParse(value).success, {
    message: "Selecciona un registro válido.",
  });

export const courseCategorySchema = z.object({
  id: z.uuid().optional(),
  name: z.string().trim().min(2, "El nombre es obligatorio.").max(120),
  slug: optionalShortText,
  description: optionalLongText,
  color: z.string().trim().max(32),
  icon: z.string().trim().max(80),
  isActive: z.boolean(),
});

export const courseSchema = z.object({
  id: z.uuid().optional(),
  categoryId: idOrEmpty,
  title: z.string().trim().min(4, "El título es obligatorio.").max(180),
  slug: optionalShortText,
  subtitle: optionalShortText,
  description: optionalLongText,
  objective: optionalLongText,
  expectedResult: optionalLongText,
  targetAudience: optionalLongText,
  level: z.enum(COURSE_LEVELS),
  status: z.enum(COURSE_STATUSES),
  thumbnailUrl: optionalUrl,
  estimatedDurationMinutes: z.number().int().min(0),
  isFree: z.boolean(),
  sortOrder: z.number().int().min(0),
});

export const courseModuleSchema = z.object({
  id: z.uuid().optional(),
  courseId: z.uuid(),
  title: z.string().trim().min(3, "El título es obligatorio.").max(180),
  description: optionalLongText,
  sortOrder: z.number().int().min(0),
  isRequired: z.boolean(),
});

export const lessonSchema = z.object({
  id: z.uuid().optional(),
  moduleId: z.uuid(),
  title: z.string().trim().min(3, "El título es obligatorio.").max(180),
  slug: optionalShortText,
  description: optionalLongText,
  content: optionalLongText,
  videoUrl: optionalUrl,
  videoProvider: z.enum(VIDEO_PROVIDERS),
  estimatedDurationMinutes: z.number().int().min(0),
  lessonType: z.enum(LESSON_TYPES),
  sortOrder: z.number().int().min(0),
  isPreview: z.boolean(),
  isRequired: z.boolean(),
});

export const lessonResourceSchema = z.object({
  id: z.uuid().optional(),
  lessonId: z.uuid(),
  title: z.string().trim().min(3, "El título es obligatorio.").max(180),
  description: optionalLongText,
  resourceType: z.enum(RESOURCE_TYPES),
  fileUrl: optionalUrl,
  externalUrl: optionalUrl,
  sortOrder: z.number().int().min(0),
  isDownloadable: z.boolean(),
});

export const reorderCourseModulesSchema = z.object({
  courseId: z.uuid(),
  moduleIds: z.array(z.uuid()).min(1),
});

export const reorderLessonsSchema = z.object({
  moduleId: z.uuid(),
  lessonIds: z.array(z.uuid()).min(1),
});

export type CourseCategoryInput = z.infer<typeof courseCategorySchema>;
export type CourseInput = z.infer<typeof courseSchema>;
export type CourseModuleInput = z.infer<typeof courseModuleSchema>;
export type LessonInput = z.infer<typeof lessonSchema>;
export type LessonResourceInput = z.infer<typeof lessonResourceSchema>;
