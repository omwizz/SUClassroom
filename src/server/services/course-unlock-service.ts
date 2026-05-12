import type { UnlockReason } from "@/constants/progress";
import { UNLOCK_REASON_LABELS } from "@/constants/progress";
import type { Course } from "@/types/courses";
import type {
  CourseUnlock,
  CourseUnlockRule,
  CourseUnlockState,
  UserCourseProgress,
} from "@/types/progress";

export class CourseUnlockService {
  static isCompleted(progress?: UserCourseProgress | null) {
    return progress?.status === "completed" || progress?.status === "approved";
  }

  static reasonMessage(reason: UnlockReason) {
    const messages: Record<UnlockReason, string> = {
      first_free_course: "Disponible como curso inicial de la ruta.",
      previous_course_completed: "Disponible porque completaste el curso anterior.",
      admin_manual: "Desbloqueado manualmente por administracion.",
      payment_confirmed: "Disponible por pago confirmado.",
      mentorship_completed: "Disponible por mentoria completada.",
    };

    return messages[reason];
  }

  static getUnlockState(input: {
    course: Course;
    unlock?: CourseUnlock | null;
    rule?: CourseUnlockRule | null;
    previousProgress?: UserCourseProgress | null;
  }): CourseUnlockState {
    if (input.unlock) {
      return {
        isUnlocked: true,
        reason: input.unlock.reason,
        message: this.reasonMessage(input.unlock.reason),
        rule: input.rule ?? null,
        unlock: input.unlock,
      };
    }

    if (input.course.isFree) {
      return {
        isUnlocked: true,
        reason: "first_free_course",
        message: this.reasonMessage("first_free_course"),
        rule: input.rule ?? null,
        unlock: null,
      };
    }

    if (!input.rule) {
      return {
        isUnlocked: false,
        reason: "no_rule",
        message: "Este curso todavia no tiene una regla de desbloqueo activa.",
        rule: null,
        unlock: null,
      };
    }

    if (
      input.rule.requiredPreviousCourseId &&
      !this.isCompleted(input.previousProgress)
    ) {
      return {
        isUnlocked: false,
        reason: "rule_pending",
        message: "Completa el curso anterior y aprueba su entregable para avanzar.",
        rule: input.rule,
        unlock: null,
      };
    }

    if (input.rule.requiresPayment) {
      return {
        isUnlocked: false,
        reason: "rule_pending",
        message: "Este curso queda preparado para desbloqueo por pago confirmado.",
        rule: input.rule,
        unlock: null,
      };
    }

    if (input.rule.requiresMentorship) {
      return {
        isUnlocked: false,
        reason: "rule_pending",
        message: "Este curso queda preparado para desbloqueo por mentoria completada.",
        rule: input.rule,
        unlock: null,
      };
    }

    return {
      isUnlocked: true,
      reason: input.rule.requiredPreviousCourseId
        ? "previous_course_completed"
        : "first_free_course",
      message: input.rule.requiredPreviousCourseId
        ? this.reasonMessage("previous_course_completed")
        : "Disponible por regla base de desbloqueo.",
      rule: input.rule,
      unlock: null,
    };
  }

  static labelForReason(reason: CourseUnlockState["reason"]) {
    if (reason === "rule_pending") {
      return "Regla pendiente";
    }

    if (reason === "no_rule") {
      return "Sin regla";
    }

    return UNLOCK_REASON_LABELS[reason];
  }
}
