import type { BusinessArea, ProjectStage } from "@/constants/projects";
import type { StudentProject } from "@/types/projects";

export function slugifyProject(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export const StudentProjectService = {
  resolveSlug(name: string) {
    return slugifyProject(name) || "proyecto";
  },

  suggestedCourseSlug(area: BusinessArea, stage: ProjectStage) {
    if (stage === "idea" || area === "validation") {
      return "de-la-idea-a-la-validacion-inicial";
    }

    if (area === "business_model" || stage === "validation") {
      return "modelo-operativo-minimo";
    }

    return "de-la-idea-a-la-validacion-inicial";
  },

  nextStep(project?: StudentProject | null) {
    if (!project) {
      return {
        title: "Registra tu proyecto",
        description:
          "Crea una ficha clara con problema, publico y etapa actual antes de avanzar.",
        href: "/dashboard/student/project/edit",
        action: "Crear proyecto",
      };
    }

    if (project.status === "archived") {
      return {
        title: "Activa un proyecto vigente",
        description:
          "Tu proyecto actual esta archivado. Crea o actualiza una ficha activa para continuar.",
        href: "/dashboard/student/project/edit",
        action: "Actualizar proyecto",
      };
    }

    return {
      title: "Conecta aprendizaje con ejecucion",
      description:
        "Empieza por el curso recomendado y usa tu ficha de proyecto como guia de aplicacion.",
      href: "/dashboard/student/courses",
      action: "Continuar con mi primer curso",
    };
  },
};
