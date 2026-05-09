import type { UserRole } from "@/constants/roles";
import type { DashboardRoute } from "@/types/dashboard";

export const dashboardNavigation: Record<UserRole, DashboardRoute[]> = {
  student: [
    {
      title: "Mi progreso",
      href: "/dashboard/student",
      icon: "layout-dashboard",
      roles: ["student", "admin"],
    },
    {
      title: "Cursos",
      href: "/dashboard/student/courses",
      icon: "book-open",
      roles: ["student", "admin"],
    },
    {
      title: "Mi proyecto",
      href: "/dashboard/student/project",
      icon: "folder",
      roles: ["student", "admin"],
    },
    {
      title: "Entregables",
      href: "/dashboard/student/deliverables",
      icon: "file-text",
      roles: ["student", "admin"],
    },
    {
      title: "Feedback",
      href: "/dashboard/student/feedback",
      icon: "message",
      roles: ["student", "admin"],
    },
    {
      title: "Asesorias",
      href: "/dashboard/student/mentorship",
      icon: "calendar",
      roles: ["student", "admin"],
    },
    {
      title: "Recursos",
      href: "/dashboard/student/resources",
      icon: "graduation-cap",
      roles: ["student", "admin"],
    },
    {
      title: "Perfil",
      href: "/dashboard/profile",
      icon: "settings",
      roles: ["student", "admin"],
    },
  ],
  mentor: [
    {
      title: "Panel",
      href: "/dashboard/mentor",
      icon: "layout-dashboard",
      roles: ["mentor", "admin"],
    },
    {
      title: "Entregables",
      href: "/dashboard/mentor/deliverables",
      icon: "file-text",
      roles: ["mentor", "admin"],
    },
    {
      title: "Alumnos",
      href: "/dashboard/mentor/students",
      icon: "users",
      roles: ["mentor", "admin"],
    },
    {
      title: "Evaluaciones",
      href: "/dashboard/mentor/evaluations",
      icon: "clipboard-check",
      roles: ["mentor", "admin"],
    },
    {
      title: "Asesorias",
      href: "/dashboard/mentor/mentorship",
      icon: "handshake",
      roles: ["mentor", "admin"],
    },
    {
      title: "Feedback",
      href: "/dashboard/mentor/feedback",
      icon: "message",
      roles: ["mentor", "admin"],
    },
    {
      title: "Perfil",
      href: "/dashboard/profile",
      icon: "settings",
      roles: ["mentor", "admin"],
    },
  ],
  admin: [
    {
      title: "Panel",
      href: "/dashboard/admin",
      icon: "layout-dashboard",
      roles: ["admin"],
    },
    {
      title: "Usuarios",
      href: "/dashboard/admin/users",
      icon: "users",
      roles: ["admin"],
    },
    {
      title: "Cursos",
      href: "/dashboard/admin/courses",
      icon: "book-open",
      roles: ["admin"],
    },
    {
      title: "Categorias",
      href: "/dashboard/admin/categories",
      icon: "tags",
      roles: ["admin"],
    },
    {
      title: "Mentores",
      href: "/dashboard/admin/mentors",
      icon: "graduation-cap",
      roles: ["admin"],
    },
    {
      title: "Asignaciones",
      href: "/dashboard/admin/mentor-assignments",
      icon: "users",
      roles: ["admin"],
    },
    {
      title: "Proyectos",
      href: "/dashboard/admin/projects",
      icon: "folder",
      roles: ["admin"],
    },
    {
      title: "Entregables",
      href: "/dashboard/admin/deliverables",
      icon: "file-text",
      roles: ["admin"],
    },
    {
      title: "Pagos",
      href: "/dashboard/admin/payments",
      icon: "briefcase",
      roles: ["admin"],
    },
    {
      title: "Reportes",
      href: "/dashboard/admin/reports",
      icon: "bar-chart",
      roles: ["admin"],
    },
    {
      title: "Configuracion",
      href: "/dashboard/admin/settings",
      icon: "settings",
      roles: ["admin"],
    },
  ],
  institution: [
    {
      title: "Panel",
      href: "/dashboard/institution",
      icon: "layout-dashboard",
      roles: ["institution", "admin"],
    },
    {
      title: "Cohortes",
      href: "/dashboard/institution/cohorts",
      icon: "users",
      roles: ["institution", "admin"],
    },
    {
      title: "Participantes",
      href: "/dashboard/institution/participants",
      icon: "graduation-cap",
      roles: ["institution", "admin"],
    },
    {
      title: "Cursos asignados",
      href: "/dashboard/institution/assigned-courses",
      icon: "book-open",
      roles: ["institution", "admin"],
    },
    {
      title: "Progreso",
      href: "/dashboard/institution/progress",
      icon: "clipboard-check",
      roles: ["institution", "admin"],
    },
    {
      title: "Reportes",
      href: "/dashboard/institution/reports",
      icon: "bar-chart",
      roles: ["institution", "admin"],
    },
    {
      title: "Configuracion",
      href: "/dashboard/institution/settings",
      icon: "settings",
      roles: ["institution", "admin"],
    },
  ],
};

export function getNavigationForRole(role: UserRole) {
  return dashboardNavigation[role];
}
