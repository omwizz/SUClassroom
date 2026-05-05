import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CalendarClock,
  ClipboardCheck,
  FileText,
  FolderKanban,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  Users,
} from "lucide-react";
import type { UserRole } from "@/constants/roles";
import type { DashboardRoute } from "@/types/dashboard";

export const dashboardNavigation: Record<UserRole, DashboardRoute[]> = {
  student: [
    {
      title: "Mi progreso",
      href: "/dashboard/student",
      icon: LayoutDashboard,
      roles: ["student", "admin"],
    },
    {
      title: "Cursos",
      href: "/dashboard/student/courses",
      icon: BookOpen,
      roles: ["student", "admin"],
    },
    {
      title: "Mi proyecto",
      href: "/dashboard/student/project",
      icon: FolderKanban,
      roles: ["student", "admin"],
    },
    {
      title: "Entregables",
      href: "/dashboard/student/deliverables",
      icon: FileText,
      roles: ["student", "admin"],
    },
    {
      title: "Feedback",
      href: "/dashboard/student/feedback",
      icon: MessageSquareText,
      roles: ["student", "admin"],
    },
    {
      title: "Asesorías",
      href: "/dashboard/student/mentorship",
      icon: CalendarClock,
      roles: ["student", "admin"],
    },
    {
      title: "Recursos",
      href: "/dashboard/student/resources",
      icon: GraduationCap,
      roles: ["student", "admin"],
    },
    {
      title: "Perfil",
      href: "/dashboard/profile",
      icon: Settings,
      roles: ["student", "admin"],
    },
  ],
  mentor: [
    {
      title: "Panel",
      href: "/dashboard/mentor",
      icon: LayoutDashboard,
      roles: ["mentor", "admin"],
    },
    {
      title: "Entregables",
      href: "/dashboard/mentor/deliverables",
      icon: FileText,
      roles: ["mentor", "admin"],
    },
    {
      title: "Alumnos",
      href: "/dashboard/mentor/students",
      icon: Users,
      roles: ["mentor", "admin"],
    },
    {
      title: "Evaluaciones",
      href: "/dashboard/mentor/evaluations",
      icon: ClipboardCheck,
      roles: ["mentor", "admin"],
    },
    {
      title: "Asesorías",
      href: "/dashboard/mentor/mentorship",
      icon: Handshake,
      roles: ["mentor", "admin"],
    },
    {
      title: "Feedback",
      href: "/dashboard/mentor/feedback",
      icon: MessageSquareText,
      roles: ["mentor", "admin"],
    },
    {
      title: "Perfil",
      href: "/dashboard/profile",
      icon: Settings,
      roles: ["mentor", "admin"],
    },
  ],
  admin: [
    {
      title: "Panel",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
      roles: ["admin"],
    },
    {
      title: "Usuarios",
      href: "/dashboard/admin/users",
      icon: Users,
      roles: ["admin"],
    },
    {
      title: "Cursos",
      href: "/dashboard/admin/courses",
      icon: BookOpen,
      roles: ["admin"],
    },
    {
      title: "Mentores",
      href: "/dashboard/admin/mentors",
      icon: GraduationCap,
      roles: ["admin"],
    },
    {
      title: "Proyectos",
      href: "/dashboard/admin/projects",
      icon: FolderKanban,
      roles: ["admin"],
    },
    {
      title: "Entregables",
      href: "/dashboard/admin/deliverables",
      icon: FileText,
      roles: ["admin"],
    },
    {
      title: "Pagos",
      href: "/dashboard/admin/payments",
      icon: BriefcaseBusiness,
      roles: ["admin"],
    },
    {
      title: "Reportes",
      href: "/dashboard/admin/reports",
      icon: BarChart3,
      roles: ["admin"],
    },
    {
      title: "Configuración",
      href: "/dashboard/admin/settings",
      icon: Settings,
      roles: ["admin"],
    },
  ],
  institution: [
    {
      title: "Panel",
      href: "/dashboard/institution",
      icon: LayoutDashboard,
      roles: ["institution", "admin"],
    },
    {
      title: "Cohortes",
      href: "/dashboard/institution/cohorts",
      icon: Users,
      roles: ["institution", "admin"],
    },
    {
      title: "Participantes",
      href: "/dashboard/institution/participants",
      icon: GraduationCap,
      roles: ["institution", "admin"],
    },
    {
      title: "Cursos asignados",
      href: "/dashboard/institution/assigned-courses",
      icon: BookOpen,
      roles: ["institution", "admin"],
    },
    {
      title: "Progreso",
      href: "/dashboard/institution/progress",
      icon: ClipboardCheck,
      roles: ["institution", "admin"],
    },
    {
      title: "Reportes",
      href: "/dashboard/institution/reports",
      icon: BarChart3,
      roles: ["institution", "admin"],
    },
    {
      title: "Configuración",
      href: "/dashboard/institution/settings",
      icon: Settings,
      roles: ["institution", "admin"],
    },
  ],
};

export function getNavigationForRole(role: UserRole) {
  return dashboardNavigation[role];
}
