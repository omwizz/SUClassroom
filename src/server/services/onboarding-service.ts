import type { StudentOnboarding } from "@/types/projects";

export const OnboardingService = {
  isCompleted(onboarding?: StudentOnboarding | null) {
    return Boolean(onboarding?.completedAt);
  },

  nextDashboardStep(onboarding?: StudentOnboarding | null) {
    if (!onboarding) {
      return {
        title: "Completa tu diagnostico inicial",
        description:
          "Define tu perfil, objetivo y proyecto base para recibir una ruta de aprendizaje mas precisa.",
        href: "/onboarding",
        action: "Empezar onboarding",
      };
    }

    return {
      title: "Continua con tu primer curso",
      description:
        "Usa la informacion del diagnostico para avanzar desde aprendizaje hacia aplicacion real.",
      href: "/dashboard/student/courses",
      action: "Ver cursos",
    };
  },
};

