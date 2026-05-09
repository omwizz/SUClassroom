import { notFound } from "next/navigation";
import { DeliverableDetailView } from "@/features/deliverables/components/deliverable-detail-view";
import { requireRole } from "@/server/guards/role-guard";
import { getStudentDeliverableById } from "@/server/queries/deliverables";

export const dynamic = "force-dynamic";

type StudentDeliverableDetailPageProps = {
  params: Promise<{ deliverableId: string }>;
};

export default async function StudentDeliverableDetailPage({
  params,
}: StudentDeliverableDetailPageProps) {
  const profile = await requireRole(["student"]);
  const { deliverableId } = await params;
  const deliverable = await getStudentDeliverableById(deliverableId, profile.id);

  if (!deliverable) {
    notFound();
  }

  return <DeliverableDetailView deliverable={deliverable} />;
}

