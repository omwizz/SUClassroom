import { z } from "zod";
import {
  BUSINESS_AREAS,
  EXPERIENCE_LEVELS,
  PROJECT_STAGES,
  USER_TYPES,
} from "@/constants/projects";

const optionalLongText = z.string().trim().max(2000);

export const onboardingSchema = z.object({
  userType: z.enum(USER_TYPES),
  experienceLevel: z.enum(EXPERIENCE_LEVELS),
  mainGoal: z
    .string()
    .trim()
    .min(8, "Describe tu objetivo principal.")
    .max(600),
  businessArea: z.enum(BUSINESS_AREAS),
  projectStage: z.enum(PROJECT_STAGES),
  biggestChallenge: optionalLongText,
  motivation: optionalLongText,
});

export const studentProjectSchema = z.object({
  name: z.string().trim().min(3, "El nombre es obligatorio.").max(120),
  description: z
    .string()
    .trim()
    .min(20, "Describe el proyecto con un poco mas de detalle.")
    .max(1200),
  problem: z
    .string()
    .trim()
    .min(16, "Explica el problema que quieres resolver.")
    .max(1200),
  solution: optionalLongText,
  targetAudience: z
    .string()
    .trim()
    .min(8, "Define a quien ayudas o atiendes.")
    .max(700),
  currentStage: z.enum(PROJECT_STAGES),
  businessArea: z.enum(BUSINESS_AREAS),
  socialImpact: optionalLongText,
});

export const onboardingWizardSchema = z.object({
  onboarding: onboardingSchema,
  project: studentProjectSchema,
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
export type StudentProjectInput = z.infer<typeof studentProjectSchema>;
export type OnboardingWizardInput = z.infer<typeof onboardingWizardSchema>;
