import type { Deliverable } from "@/types/deliverables";
import type { MentorAssignment } from "@/types/evaluations";

export const MentorAssignmentService = {
  matchesDeliverable(assignment: MentorAssignment, deliverable: Deliverable) {
    if (assignment.status !== "active") {
      return false;
    }

    if (assignment.studentId !== deliverable.studentId) {
      return false;
    }

    if (assignment.projectId && assignment.projectId !== deliverable.projectId) {
      return false;
    }

    if (assignment.courseId && assignment.courseId !== deliverable.courseId) {
      return false;
    }

    return true;
  },
};
