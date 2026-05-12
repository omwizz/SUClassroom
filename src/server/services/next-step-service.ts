import type { CourseProgressItem, StudentProgressSummary } from "@/types/progress";

export type NextProgressStep = {
  title: string;
  description: string;
  href: string;
  actionLabel: string;
};

export class NextStepService {
  static fromProgressSummary(summary: StudentProgressSummary): NextProgressStep {
    if (summary.nextCourse) {
      return this.fromCourse(summary.nextCourse);
    }

    if (summary.completedCourses > 0 && summary.lockedCourses > 0) {
      return {
        title: "Solicita el siguiente desbloqueo",
        description:
          "Ya tienes cursos completados. Revisa si falta una regla, pago futuro o desbloqueo administrativo.",
        href: "/dashboard/student/progress",
        actionLabel: "Ver progreso",
      };
    }

    return {
      title: "Explora tu ruta",
      description:
        "Revisa los cursos disponibles y elige el primer curso que conecte con tu proyecto.",
      href: "/dashboard/student/courses",
      actionLabel: "Ver cursos",
    };
  }

  static fromCourse(item: CourseProgressItem): NextProgressStep {
    if (item.status === "available") {
      return {
        title: "Inicia tu siguiente curso",
        description: item.course.subtitle ?? "Este curso esta listo para empezar.",
        href: `/dashboard/student/courses/${item.course.slug}`,
        actionLabel: "Empezar curso",
      };
    }

    if (item.status === "pending_review") {
      return {
        title: "Espera la revision del entregable",
        description:
          "Tu avance ya esta enviado. El resultado de la evaluacion actualizara la ruta.",
        href: "/dashboard/student/deliverables",
        actionLabel: "Ver entregables",
      };
    }

    return {
      title: "Continua el curso activo",
      description:
        item.course.subtitle ?? "Completa las lecciones y prepara tu evidencia.",
      href: `/dashboard/student/courses/${item.course.slug}`,
      actionLabel: "Continuar",
    };
  }
}
