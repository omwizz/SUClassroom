import type {
  CourseLevel,
  CourseStatus,
  LessonType,
  ResourceType,
  VideoProvider,
} from "@/constants/courses";

export type CourseCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LessonResource = {
  id: string;
  lessonId: string;
  title: string;
  description: string | null;
  resourceType: ResourceType;
  fileUrl: string | null;
  externalUrl: string | null;
  sortOrder: number;
  isDownloadable: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  videoUrl: string | null;
  videoProvider: VideoProvider;
  estimatedDurationMinutes: number;
  lessonType: LessonType;
  sortOrder: number;
  isPreview: boolean;
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
  resources: LessonResource[];
};

export type CourseModule = {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  sortOrder: number;
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  categoryId: string | null;
  category: CourseCategory | null;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  objective: string | null;
  expectedResult: string | null;
  targetAudience: string | null;
  level: CourseLevel;
  status: CourseStatus;
  thumbnailUrl: string | null;
  estimatedDurationMinutes: number;
  isFree: boolean;
  sortOrder: number;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  modules: CourseModule[];
};

export type CourseFilters = {
  search?: string;
  category?: string;
  level?: CourseLevel | "all";
};

export type CourseActionState = {
  ok: boolean;
  message: string;
  redirectTo?: string;
  entityId?: string;
  slug?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

