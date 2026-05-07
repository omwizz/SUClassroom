import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/features/projects/components/project-detail-view";
import { requireRole } from "@/server/guards/role-guard";
import { getAdminStudentProjectById } from "@/server/queries/projects";

export const dynamic = "force-dynamic";

type AdminProjectDetailPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function AdminProjectDetailPage({
  params,
}: AdminProjectDetailPageProps) {
  await requireRole(["admin"]);
  const { projectId } = await params;
  const project = await getAdminStudentProjectById(projectId);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView adminView project={project} />;
}
