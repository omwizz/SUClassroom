export const COURSE_STATUSES = ["draft", "published", "archived"] as const;

export const COURSE_LEVELS = ["beginner", "intermediate", "advanced"] as const;

export const LESSON_TYPES = [
  "video",
  "text",
  "mixed",
  "assignment_intro",
] as const;

export const VIDEO_PROVIDERS = [
  "youtube",
  "vimeo",
  "external",
  "storage",
  "none",
] as const;

export const RESOURCE_TYPES = [
  "pdf",
  "document",
  "spreadsheet",
  "presentation",
  "template",
  "link",
  "image",
  "other",
] as const;

export type CourseStatus = (typeof COURSE_STATUSES)[number];
export type CourseLevel = (typeof COURSE_LEVELS)[number];
export type LessonType = (typeof LESSON_TYPES)[number];
export type VideoProvider = (typeof VIDEO_PROVIDERS)[number];
export type ResourceType = (typeof RESOURCE_TYPES)[number];

export const COURSE_STATUS_LABELS: Record<CourseStatus, string> = {
  draft: "Borrador",
  published: "Publicado",
  archived: "Archivado",
};

export const COURSE_LEVEL_LABELS: Record<CourseLevel, string> = {
  beginner: "Inicial",
  intermediate: "Intermedio",
  advanced: "Avanzado",
};

export const LESSON_TYPE_LABELS: Record<LessonType, string> = {
  video: "Video",
  text: "Texto",
  mixed: "Mixta",
  assignment_intro: "Preparación de entregable",
};

export const VIDEO_PROVIDER_LABELS: Record<VideoProvider, string> = {
  youtube: "YouTube",
  vimeo: "Vimeo",
  external: "Externo",
  storage: "Archivo",
  none: "Sin video",
};

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  pdf: "PDF",
  document: "Documento",
  spreadsheet: "Hoja de cálculo",
  presentation: "Presentación",
  template: "Plantilla",
  link: "Enlace",
  image: "Imagen",
  other: "Otro",
};

