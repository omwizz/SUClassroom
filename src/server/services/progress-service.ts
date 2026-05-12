import type { DeliverableStatus } from "@/constants/deliverables";
import type {
  CourseProgressStatus,
  LessonProgressStatus,
  ProgressEventType,
} from "@/constants/progress";
import type { Course } from "@/types/courses";

export class ProgressService {
  static getRequiredLessons(course: Course) {
    return course.modules
      .flatMap((moduleItem) => moduleItem.lessons)
      .filter((lesson) => lesson.isRequired);
  }

  static calculateCourseProgress(input: {
    completedLessons: number;
    totalRequiredLessons: number;
    hasApprovedDeliverable: boolean;
    hasRequiredDeliverable: boolean;
  }) {
    if (input.hasApprovedDeliverable) {
      return 100;
    }

    if (input.totalRequiredLessons === 0) {
      return input.hasRequiredDeliverable ? 0 : 10;
    }

    const lessonRatio =
      input.completedLessons / Math.max(input.totalRequiredLessons, 1);
    const lessonCap = input.hasRequiredDeliverable ? 80 : 90;

    return Math.min(lessonCap, Math.round(lessonRatio * lessonCap));
  }

  static statusAfterStart(current?: CourseProgressStatus | null) {
    if (current === "completed" || current === "approved") {
      return current;
    }

    return "in_progress" satisfies CourseProgressStatus;
  }

  static statusAfterDeliverable(status: DeliverableStatus): CourseProgressStatus {
    if (status === "approved") {
      return "completed";
    }

    if (status === "submitted" || status === "resubmitted" || status === "under_review") {
      return "pending_review";
    }

    return "in_progress";
  }

  static lessonStatusAfterCompletion(): LessonProgressStatus {
    return "completed";
  }

  static shouldCompleteCourse(input: {
    deliverableStatus: DeliverableStatus | null;
    hasRequiredDeliverable: boolean;
  }) {
    return input.hasRequiredDeliverable && input.deliverableStatus === "approved";
  }

  static eventTitle(type: ProgressEventType) {
    const titles: Record<ProgressEventType, string> = {
      course_started: "Curso iniciado",
      lesson_completed: "Leccion completada",
      deliverable_submitted: "Entregable enviado",
      deliverable_approved: "Entregable aprobado",
      deliverable_rejected: "Entregable observado",
      course_completed: "Curso completado",
      course_unlocked: "Curso desbloqueado",
    };

    return titles[type];
  }
}
