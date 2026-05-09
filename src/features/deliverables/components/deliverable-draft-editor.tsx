import { DeliverableForm } from "@/features/deliverables/components/deliverable-form";
import type { Course } from "@/types/courses";
import type { DeliverableDetail } from "@/types/deliverables";
import type { StudentProject } from "@/types/projects";

type DeliverableDraftEditorProps = {
  project: StudentProject;
  courses: Course[];
  deliverable: DeliverableDetail;
};

export function DeliverableDraftEditor({
  project,
  courses,
  deliverable,
}: DeliverableDraftEditorProps) {
  return (
    <DeliverableForm
      courses={courses}
      deliverable={deliverable}
      project={project}
    />
  );
}

