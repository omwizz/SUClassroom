import type {
  BusinessArea,
  ExperienceLevel,
  ProjectStage,
  ProjectStatus,
  UserType,
} from "@/constants/projects";

export type StudentOnboarding = {
  id: string;
  studentId: string;
  userType: UserType;
  experienceLevel: ExperienceLevel;
  mainGoal: string;
  businessArea: BusinessArea;
  projectStage: ProjectStage;
  biggestChallenge: string | null;
  motivation: string | null;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type StudentProject = {
  id: string;
  studentId: string;
  name: string;
  slug: string;
  description: string;
  problem: string;
  solution: string | null;
  targetAudience: string;
  currentStage: ProjectStage;
  businessArea: BusinessArea;
  socialImpact: string | null;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

export type ProjectStudentSummary = {
  id: string;
  fullName: string | null;
  email: string;
};

export type AdminStudentProject = StudentProject & {
  student: ProjectStudentSummary | null;
};

export type ProjectFilters = {
  search?: string;
  status?: ProjectStatus | "all";
  stage?: ProjectStage | "all";
};

export type ProjectActionState = {
  ok: boolean;
  message: string;
  redirectTo?: string;
  entityId?: string;
  slug?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

