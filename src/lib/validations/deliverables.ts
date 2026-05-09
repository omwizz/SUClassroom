import { z } from "zod";
import {
  DELIVERABLE_MAX_FILES,
  DELIVERABLE_STATUSES,
  RESOURCE_FILE_TYPES,
} from "@/constants/deliverables";

const optionalLongText = z.string().trim().max(4000);

export const deliverableLinkSchema = z.object({
  id: z.uuid().optional(),
  title: z.string().trim().min(2, "El titulo es obligatorio.").max(160),
  url: z.url("Ingresa una URL valida."),
  description: optionalLongText,
});

export const deliverableSchema = z.object({
  id: z.uuid().optional(),
  projectId: z.uuid(),
  courseId: z.uuid(),
  title: z.string().trim().min(4, "El titulo es obligatorio.").max(180),
  description: z
    .string()
    .trim()
    .min(20, "Describe la evidencia con al menos 20 caracteres.")
    .max(4000),
  links: z.array(deliverableLinkSchema).max(8).optional(),
});

export const deliverableFileSchema = z.object({
  fileName: z.string().trim().min(1, "El archivo necesita nombre.").max(240),
  mimeType: z.string().trim().min(1, "El tipo de archivo es obligatorio."),
  sizeBytes: z.number().int().positive(),
  filePath: z.string().trim().min(1),
});

export const submitDeliverableSchema = z.object({
  deliverableId: z.uuid(),
  confirm: z.literal(true, {
    error: "Confirma que quieres enviar este entregable.",
  }),
});

export const deliverableRequirementSchema = z.object({
  id: z.uuid().optional(),
  courseId: z.uuid(),
  title: z.string().trim().min(4, "El titulo es obligatorio.").max(180),
  description: optionalLongText,
  instructions: z
    .string()
    .trim()
    .min(20, "Las instrucciones necesitan mas detalle.")
    .max(4000),
  requiredFileTypes: z.array(z.enum(RESOURCE_FILE_TYPES)).max(8),
  maxFiles: z.number().int().min(1).max(DELIVERABLE_MAX_FILES),
  isRequired: z.boolean(),
});

export const deliverableStatusSchema = z.enum(DELIVERABLE_STATUSES);
export const deliverableIdSchema = z.object({ deliverableId: z.uuid() });
export const deliverableFileIdSchema = z.object({
  deliverableId: z.uuid(),
  fileId: z.uuid(),
});
export const deliverableLinkIdSchema = z.object({
  deliverableId: z.uuid(),
  linkId: z.uuid(),
});

export type DeliverableInput = z.infer<typeof deliverableSchema>;
export type DeliverableFileInput = z.infer<typeof deliverableFileSchema>;
export type DeliverableLinkInput = z.infer<typeof deliverableLinkSchema>;
export type SubmitDeliverableInput = z.infer<typeof submitDeliverableSchema>;
export type DeliverableRequirementInput = z.infer<
  typeof deliverableRequirementSchema
>;
