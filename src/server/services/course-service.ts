import type { CourseStatus } from "@/constants/courses";

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

export function resolveSlug(preferredSlug: string | undefined, fallback: string) {
  return slugify(preferredSlug?.trim() ? preferredSlug : fallback);
}

export function emptyToNull(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function publishedAtForStatus(
  nextStatus: CourseStatus,
  currentPublishedAt?: Date | null,
) {
  if (nextStatus === "published") {
    return currentPublishedAt ?? new Date();
  }

  return null;
}

export function orderedUpdates(ids: string[]) {
  return ids.map((id, index) => ({
    id,
    sortOrder: index + 1,
  }));
}

