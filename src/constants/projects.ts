export const USER_TYPES = [
  "entrepreneur",
  "social_leader",
  "social_entrepreneur",
  "institution_participant",
  "other",
] as const;

export const EXPERIENCE_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

export const PROJECT_STAGES = [
  "idea",
  "validation",
  "early_execution",
  "growth",
  "paused",
] as const;

export const PROJECT_STATUSES = [
  "draft",
  "active",
  "paused",
  "completed",
  "archived",
] as const;

export const BUSINESS_AREAS = [
  "validation",
  "business_model",
  "marketing_sales",
  "finance",
  "operations",
  "social_programs",
  "sustainability",
  "other",
] as const;

export type UserType = (typeof USER_TYPES)[number];
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];
export type ProjectStage = (typeof PROJECT_STAGES)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type BusinessArea = (typeof BUSINESS_AREAS)[number];

export const USER_TYPE_LABELS: Record<UserType, string> = {
  entrepreneur: "Emprendedor",
  social_leader: "Lider social",
  social_entrepreneur: "Emprendedor social",
  institution_participant: "Participante institucional",
  other: "Otro perfil",
};

export const EXPERIENCE_LEVEL_LABELS: Record<ExperienceLevel, string> = {
  beginner: "Estoy empezando",
  intermediate: "Ya valide algunas ideas",
  advanced: "Tengo experiencia ejecutando",
};

export const PROJECT_STAGE_LABELS: Record<ProjectStage, string> = {
  idea: "Idea inicial",
  validation: "Validacion",
  early_execution: "Primeras ventas o pilotos",
  growth: "Crecimiento",
  paused: "Pausado",
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: "Borrador",
  active: "Activo",
  paused: "Pausado",
  completed: "Completado",
  archived: "Archivado",
};

export const BUSINESS_AREA_LABELS: Record<BusinessArea, string> = {
  validation: "Validacion",
  business_model: "Modelo de negocio",
  marketing_sales: "Marketing y ventas",
  finance: "Finanzas",
  operations: "Operaciones",
  social_programs: "Programas sociales",
  sustainability: "Sostenibilidad",
  other: "Otra area",
};

