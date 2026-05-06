import { asc, eq } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@/db/client";
import {
  courseCategories,
  courseModules,
  courses,
  lessonResources,
  lessons,
} from "@/db/schema";
import { demoCourseCategories, demoCourses } from "@/features/courses/data/demo-courses";
import type { CourseCategoryInput, CourseInput, CourseModuleInput, LessonInput, LessonResourceInput } from "@/lib/validations/courses";
import {
  emptyToNull,
  orderedUpdates,
  publishedAtForStatus,
  resolveSlug,
} from "@/server/services/course-service";
import type {
  Course,
  CourseCategory,
  CourseFilters,
  CourseModule,
  Lesson,
  LessonResource,
} from "@/types/courses";

type CategoryRow = typeof courseCategories.$inferSelect;
type CourseRow = typeof courses.$inferSelect;
type ModuleRow = typeof courseModules.$inferSelect;
type LessonRow = typeof lessons.$inferSelect;
type ResourceRow = typeof lessonResources.$inferSelect;

function toIso(value: Date | null) {
  return value ? value.toISOString() : null;
}

function mapCategory(row: CategoryRow): CourseCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    color: row.color,
    icon: row.icon,
    isActive: row.isActive,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapResource(row: ResourceRow): LessonResource {
  return {
    id: row.id,
    lessonId: row.lessonId,
    title: row.title,
    description: row.description,
    resourceType: row.resourceType,
    fileUrl: row.fileUrl,
    externalUrl: row.externalUrl,
    sortOrder: row.sortOrder,
    isDownloadable: row.isDownloadable,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapLesson(row: LessonRow, resources: LessonResource[]): Lesson {
  return {
    id: row.id,
    moduleId: row.moduleId,
    title: row.title,
    slug: row.slug,
    description: row.description,
    content: row.content,
    videoUrl: row.videoUrl,
    videoProvider: row.videoProvider,
    estimatedDurationMinutes: row.estimatedDurationMinutes,
    lessonType: row.lessonType,
    sortOrder: row.sortOrder,
    isPreview: row.isPreview,
    isRequired: row.isRequired,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    resources,
  };
}

function mapModule(row: ModuleRow, moduleLessons: Lesson[]): CourseModule {
  return {
    id: row.id,
    courseId: row.courseId,
    title: row.title,
    description: row.description,
    sortOrder: row.sortOrder,
    isRequired: row.isRequired,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    lessons: moduleLessons,
  };
}

function mapCourse(
  row: CourseRow,
  category: CourseCategory | null,
  modules: CourseModule[],
): Course {
  return {
    id: row.id,
    categoryId: row.categoryId,
    category,
    title: row.title,
    slug: row.slug,
    subtitle: row.subtitle,
    description: row.description,
    objective: row.objective,
    expectedResult: row.expectedResult,
    targetAudience: row.targetAudience,
    level: row.level,
    status: row.status,
    thumbnailUrl: row.thumbnailUrl,
    estimatedDurationMinutes: row.estimatedDurationMinutes,
    isFree: row.isFree,
    sortOrder: row.sortOrder,
    createdBy: row.createdBy,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    publishedAt: toIso(row.publishedAt),
    modules,
  };
}

function filterCourses(items: Course[], filters?: CourseFilters) {
  const search = filters?.search?.trim().toLowerCase();
  const category = filters?.category?.trim();
  const level = filters?.level;

  return items.filter((course) => {
    const matchesSearch = search
      ? [course.title, course.subtitle, course.description, course.objective]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(search))
      : true;
    const matchesCategory =
      category && category !== "all" ? course.category?.slug === category : true;
    const matchesLevel =
      level && level !== "all" ? course.level === level : true;

    return matchesSearch && matchesCategory && matchesLevel;
  });
}

async function hydrateResources(lessonId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(lessonResources)
    .where(eq(lessonResources.lessonId, lessonId))
    .orderBy(asc(lessonResources.sortOrder), asc(lessonResources.createdAt));

  return rows.map(mapResource);
}

async function hydrateLessons(moduleId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(lessons)
    .where(eq(lessons.moduleId, moduleId))
    .orderBy(asc(lessons.sortOrder), asc(lessons.createdAt));

  return Promise.all(
    rows.map(async (row) => mapLesson(row, await hydrateResources(row.id))),
  );
}

async function hydrateModules(courseId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(courseModules)
    .where(eq(courseModules.courseId, courseId))
    .orderBy(asc(courseModules.sortOrder), asc(courseModules.createdAt));

  return Promise.all(
    rows.map(async (row) => mapModule(row, await hydrateLessons(row.id))),
  );
}

async function findCategoryById(categoryId: string | null) {
  if (!categoryId) {
    return null;
  }

  const db = getDb();
  const [category] = await db
    .select()
    .from(courseCategories)
    .where(eq(courseCategories.id, categoryId))
    .limit(1);

  return category ? mapCategory(category) : null;
}

async function hydrateCourse(row: CourseRow) {
  const [category, modules] = await Promise.all([
    findCategoryById(row.categoryId),
    hydrateModules(row.id),
  ]);

  return mapCourse(row, category, modules);
}

export async function getCourseCategories(includeInactive = false) {
  if (!hasDatabaseUrl()) {
    return demoCourseCategories.filter(
      (category) => includeInactive || category.isActive,
    );
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(courseCategories)
    .orderBy(asc(courseCategories.name));

  return rows
    .map(mapCategory)
    .filter((category) => includeInactive || category.isActive);
}

export async function getAdminCourses() {
  if (!hasDatabaseUrl()) {
    return demoCourses;
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(courses)
    .orderBy(asc(courses.sortOrder), asc(courses.createdAt));

  return Promise.all(rows.map(hydrateCourse));
}

export async function getPublishedCourses(filters?: CourseFilters) {
  if (!hasDatabaseUrl()) {
    return filterCourses(
      demoCourses.filter((course) => course.status === "published"),
      filters,
    );
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(courses)
    .where(eq(courses.status, "published"))
    .orderBy(asc(courses.sortOrder), asc(courses.createdAt));

  const hydrated = await Promise.all(rows.map(hydrateCourse));
  return filterCourses(hydrated, filters);
}

export async function getCourseBySlug(slug: string, includeDrafts = false) {
  if (!hasDatabaseUrl()) {
    const course = demoCourses.find((item) => item.slug === slug);
    return course && (includeDrafts || course.status === "published")
      ? course
      : null;
  }

  const db = getDb();
  const [row] = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1);

  if (!row || (!includeDrafts && row.status !== "published")) {
    return null;
  }

  return hydrateCourse(row);
}

export async function getCourseById(courseId: string) {
  if (!hasDatabaseUrl()) {
    return demoCourses.find((course) => course.id === courseId) ?? null;
  }

  const db = getDb();
  const [row] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  return row ? hydrateCourse(row) : null;
}

export async function getModulesByCourse(courseId: string) {
  if (!hasDatabaseUrl()) {
    return demoCourses.find((course) => course.id === courseId)?.modules ?? [];
  }

  return hydrateModules(courseId);
}

export async function getLessonsByModule(moduleId: string) {
  if (!hasDatabaseUrl()) {
    return (
      demoCourses
        .flatMap((course) => course.modules)
        .find((moduleItem) => moduleItem.id === moduleId)?.lessons ?? []
    );
  }

  return hydrateLessons(moduleId);
}

export async function getLessonBySlug(courseSlug: string, lessonSlug: string) {
  const course = await getCourseBySlug(courseSlug);

  return (
    course?.modules
      .flatMap((moduleItem) => moduleItem.lessons)
      .find((lesson) => lesson.slug === lessonSlug) ?? null
  );
}

export async function getResourcesByLesson(lessonId: string) {
  if (!hasDatabaseUrl()) {
    return (
      demoCourses
        .flatMap((course) => course.modules)
        .flatMap((moduleItem) => moduleItem.lessons)
        .find((lesson) => lesson.id === lessonId)?.resources ?? []
    );
  }

  return hydrateResources(lessonId);
}

export async function insertCourseCategory(input: CourseCategoryInput) {
  const db = getDb();
  const [category] = await db
    .insert(courseCategories)
    .values({
      name: input.name,
      slug: resolveSlug(input.slug, input.name),
      description: emptyToNull(input.description),
      color: emptyToNull(input.color),
      icon: emptyToNull(input.icon),
      isActive: input.isActive,
      updatedAt: new Date(),
    })
    .returning();

  return mapCategory(category);
}

export async function updateCourseCategoryById(input: CourseCategoryInput & { id: string }) {
  const db = getDb();
  const [category] = await db
    .update(courseCategories)
    .set({
      name: input.name,
      slug: resolveSlug(input.slug, input.name),
      description: emptyToNull(input.description),
      color: emptyToNull(input.color),
      icon: emptyToNull(input.icon),
      isActive: input.isActive,
      updatedAt: new Date(),
    })
    .where(eq(courseCategories.id, input.id))
    .returning();

  return category ? mapCategory(category) : null;
}

export async function deactivateCourseCategoryById(categoryId: string) {
  const db = getDb();
  await db
    .update(courseCategories)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(courseCategories.id, categoryId));
}

export async function insertCourse(input: CourseInput, createdBy: string) {
  const db = getDb();
  const [course] = await db
    .insert(courses)
    .values({
      categoryId: input.categoryId || null,
      title: input.title,
      slug: resolveSlug(input.slug, input.title),
      subtitle: emptyToNull(input.subtitle),
      description: emptyToNull(input.description),
      objective: emptyToNull(input.objective),
      expectedResult: emptyToNull(input.expectedResult),
      targetAudience: emptyToNull(input.targetAudience),
      level: input.level,
      status: input.status,
      thumbnailUrl: emptyToNull(input.thumbnailUrl),
      estimatedDurationMinutes: input.estimatedDurationMinutes,
      isFree: input.isFree,
      sortOrder: input.sortOrder,
      createdBy,
      updatedAt: new Date(),
      publishedAt: publishedAtForStatus(input.status),
    })
    .returning();

  return hydrateCourse(course);
}

export async function updateCourseById(input: CourseInput & { id: string }) {
  const db = getDb();
  const current = await getCourseById(input.id);
  const [course] = await db
    .update(courses)
    .set({
      categoryId: input.categoryId || null,
      title: input.title,
      slug: resolveSlug(input.slug, input.title),
      subtitle: emptyToNull(input.subtitle),
      description: emptyToNull(input.description),
      objective: emptyToNull(input.objective),
      expectedResult: emptyToNull(input.expectedResult),
      targetAudience: emptyToNull(input.targetAudience),
      level: input.level,
      status: input.status,
      thumbnailUrl: emptyToNull(input.thumbnailUrl),
      estimatedDurationMinutes: input.estimatedDurationMinutes,
      isFree: input.isFree,
      sortOrder: input.sortOrder,
      updatedAt: new Date(),
      publishedAt: publishedAtForStatus(
        input.status,
        current?.publishedAt ? new Date(current.publishedAt) : null,
      ),
    })
    .where(eq(courses.id, input.id))
    .returning();

  return course ? hydrateCourse(course) : null;
}

export async function setCourseStatus(courseId: string, status: Course["status"]) {
  const db = getDb();
  const current = await getCourseById(courseId);
  const [course] = await db
    .update(courses)
    .set({
      status,
      updatedAt: new Date(),
      publishedAt: publishedAtForStatus(
        status,
        current?.publishedAt ? new Date(current.publishedAt) : null,
      ),
    })
    .where(eq(courses.id, courseId))
    .returning();

  return course ? hydrateCourse(course) : null;
}

export async function insertCourseModule(input: CourseModuleInput) {
  const db = getDb();
  const [moduleItem] = await db
    .insert(courseModules)
    .values({
      courseId: input.courseId,
      title: input.title,
      description: emptyToNull(input.description),
      sortOrder: input.sortOrder,
      isRequired: input.isRequired,
      updatedAt: new Date(),
    })
    .returning();

  return mapModule(moduleItem, []);
}

export async function updateCourseModuleById(input: CourseModuleInput & { id: string }) {
  const db = getDb();
  const [moduleItem] = await db
    .update(courseModules)
    .set({
      title: input.title,
      description: emptyToNull(input.description),
      sortOrder: input.sortOrder,
      isRequired: input.isRequired,
      updatedAt: new Date(),
    })
    .where(eq(courseModules.id, input.id))
    .returning();

  return moduleItem ? mapModule(moduleItem, await hydrateLessons(moduleItem.id)) : null;
}

export async function deleteCourseModuleById(moduleId: string) {
  const db = getDb();
  await db.delete(courseModules).where(eq(courseModules.id, moduleId));
}

export async function updateCourseModuleOrder(moduleIds: string[]) {
  const db = getDb();

  await Promise.all(
    orderedUpdates(moduleIds).map((item) =>
      db
        .update(courseModules)
        .set({ sortOrder: item.sortOrder, updatedAt: new Date() })
        .where(eq(courseModules.id, item.id)),
    ),
  );
}

export async function insertLesson(input: LessonInput) {
  const db = getDb();
  const [lesson] = await db
    .insert(lessons)
    .values({
      moduleId: input.moduleId,
      title: input.title,
      slug: resolveSlug(input.slug, input.title),
      description: emptyToNull(input.description),
      content: emptyToNull(input.content),
      videoUrl: emptyToNull(input.videoUrl),
      videoProvider: input.videoProvider,
      estimatedDurationMinutes: input.estimatedDurationMinutes,
      lessonType: input.lessonType,
      sortOrder: input.sortOrder,
      isPreview: input.isPreview,
      isRequired: input.isRequired,
      updatedAt: new Date(),
    })
    .returning();

  return mapLesson(lesson, []);
}

export async function updateLessonById(input: LessonInput & { id: string }) {
  const db = getDb();
  const [lesson] = await db
    .update(lessons)
    .set({
      title: input.title,
      slug: resolveSlug(input.slug, input.title),
      description: emptyToNull(input.description),
      content: emptyToNull(input.content),
      videoUrl: emptyToNull(input.videoUrl),
      videoProvider: input.videoProvider,
      estimatedDurationMinutes: input.estimatedDurationMinutes,
      lessonType: input.lessonType,
      sortOrder: input.sortOrder,
      isPreview: input.isPreview,
      isRequired: input.isRequired,
      updatedAt: new Date(),
    })
    .where(eq(lessons.id, input.id))
    .returning();

  return lesson ? mapLesson(lesson, await hydrateResources(lesson.id)) : null;
}

export async function deleteLessonById(lessonId: string) {
  const db = getDb();
  await db.delete(lessons).where(eq(lessons.id, lessonId));
}

export async function updateLessonOrder(lessonIds: string[]) {
  const db = getDb();

  await Promise.all(
    orderedUpdates(lessonIds).map((item) =>
      db
        .update(lessons)
        .set({ sortOrder: item.sortOrder, updatedAt: new Date() })
        .where(eq(lessons.id, item.id)),
    ),
  );
}

export async function insertLessonResource(input: LessonResourceInput) {
  const db = getDb();
  const [resource] = await db
    .insert(lessonResources)
    .values({
      lessonId: input.lessonId,
      title: input.title,
      description: emptyToNull(input.description),
      resourceType: input.resourceType,
      fileUrl: emptyToNull(input.fileUrl),
      externalUrl: emptyToNull(input.externalUrl),
      sortOrder: input.sortOrder,
      isDownloadable: input.isDownloadable,
      updatedAt: new Date(),
    })
    .returning();

  return mapResource(resource);
}

export async function updateLessonResourceById(
  input: LessonResourceInput & { id: string },
) {
  const db = getDb();
  const [resource] = await db
    .update(lessonResources)
    .set({
      title: input.title,
      description: emptyToNull(input.description),
      resourceType: input.resourceType,
      fileUrl: emptyToNull(input.fileUrl),
      externalUrl: emptyToNull(input.externalUrl),
      sortOrder: input.sortOrder,
      isDownloadable: input.isDownloadable,
      updatedAt: new Date(),
    })
    .where(eq(lessonResources.id, input.id))
    .returning();

  return resource ? mapResource(resource) : null;
}

export async function deleteLessonResourceById(resourceId: string) {
  const db = getDb();
  await db.delete(lessonResources).where(eq(lessonResources.id, resourceId));
}

