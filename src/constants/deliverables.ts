export const DELIVERABLE_STATUSES = [
  "draft",
  "submitted",
  "under_review",
  "changes_requested",
  "rejected",
  "approved",
  "resubmitted",
] as const;

export const RESOURCE_FILE_TYPES = [
  "pdf",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
  "image",
  "link",
  "other",
] as const;

export type DeliverableStatus = (typeof DELIVERABLE_STATUSES)[number];
export type ResourceFileType = (typeof RESOURCE_FILE_TYPES)[number];

export const DELIVERABLE_STATUS_LABELS: Record<DeliverableStatus, string> = {
  draft: "Borrador",
  submitted: "Enviado",
  under_review: "En revision",
  changes_requested: "Cambios solicitados",
  rejected: "Rechazado",
  approved: "Aprobado",
  resubmitted: "Reenviado",
};

export const RESOURCE_FILE_TYPE_LABELS: Record<ResourceFileType, string> = {
  pdf: "PDF",
  doc: "DOC",
  docx: "DOCX",
  ppt: "PPT",
  pptx: "PPTX",
  xls: "XLS",
  xlsx: "XLSX",
  image: "Imagen",
  link: "Enlace",
  other: "Otro",
};

export const DELIVERABLE_EDITABLE_STATUSES: DeliverableStatus[] = [
  "draft",
  "changes_requested",
  "rejected",
];

export const DELIVERABLE_SUBMITTABLE_STATUSES: DeliverableStatus[] = [
  "draft",
  "changes_requested",
  "rejected",
];

export const DELIVERABLE_MAX_FILES = 5;
export const DELIVERABLE_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
export const DELIVERABLE_BUCKET = "deliverables";

export const DELIVERABLE_ALLOWED_EXTENSIONS: Record<ResourceFileType, string[]> = {
  pdf: [".pdf"],
  doc: [".doc"],
  docx: [".docx"],
  ppt: [".ppt"],
  pptx: [".pptx"],
  xls: [".xls"],
  xlsx: [".xlsx"],
  image: [".jpg", ".jpeg", ".png", ".webp"],
  link: [],
  other: [],
};

export const DELIVERABLE_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

