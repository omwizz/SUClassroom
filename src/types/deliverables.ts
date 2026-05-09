import type {
  DeliverableStatus,
  ResourceFileType,
} from "@/constants/deliverables";

export type DeliverableRequirement = {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  instructions: string;
  requiredFileTypes: ResourceFileType[];
  maxFiles: number;
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
};

export type DeliverableFile = {
  id: string;
  deliverableId: string;
  uploadedBy: string;
  fileName: string;
  filePath: string;
  fileUrl: string | null;
  fileType: ResourceFileType;
  mimeType: string;
  sizeBytes: number;
  signedUrl?: string | null;
  createdAt: string;
};

export type DeliverableLink = {
  id: string;
  deliverableId: string;
  title: string;
  url: string;
  description: string | null;
  createdAt: string;
};

export type DeliverableVersion = {
  id: string;
  deliverableId: string;
  version: number;
  title: string;
  description: string;
  status: DeliverableStatus;
  snapshot: Record<string, unknown>;
  createdAt: string;
};

export type Deliverable = {
  id: string;
  projectId: string;
  courseId: string;
  studentId: string;
  title: string;
  description: string;
  instructionsSnapshot: string | null;
  status: DeliverableStatus;
  version: number;
  submittedAt: string | null;
  lastResubmittedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeliverableStudentSummary = {
  id: string;
  fullName: string | null;
  email: string;
};

export type DeliverableProjectSummary = {
  id: string;
  name: string;
  slug: string;
};

export type DeliverableCourseSummary = {
  id: string;
  title: string;
  slug: string;
};

export type DeliverableDetail = Deliverable & {
  files: DeliverableFile[];
  links: DeliverableLink[];
  versions: DeliverableVersion[];
  requirement: DeliverableRequirement | null;
  project: DeliverableProjectSummary | null;
  course: DeliverableCourseSummary | null;
};

export type AdminDeliverable = Deliverable & {
  student: DeliverableStudentSummary | null;
  project: DeliverableProjectSummary | null;
  course: DeliverableCourseSummary | null;
  filesCount: number;
  linksCount: number;
};

export type DeliverableFilters = {
  search?: string;
  status?: DeliverableStatus | "all";
  courseId?: string | "all";
};

export type DeliverableActionState = {
  ok: boolean;
  message: string;
  redirectTo?: string;
  entityId?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

