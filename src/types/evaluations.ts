import type {
  AssignmentStatus,
  EvaluationDecision,
  EvaluationStatus,
  FeedbackPriority,
  NotificationType,
} from "@/constants/evaluations";
import type {
  AdminDeliverable,
  DeliverableCourseSummary,
  DeliverableDetail,
  DeliverableProjectSummary,
  DeliverableStudentSummary,
} from "@/types/deliverables";

export type MentorAssignment = {
  id: string;
  mentorId: string;
  studentId: string;
  projectId: string | null;
  courseId: string | null;
  assignedBy: string | null;
  status: AssignmentStatus;
  createdAt: string;
  updatedAt: string;
};

export type MentorAssignmentDetail = MentorAssignment & {
  mentor: DeliverableStudentSummary | null;
  student: DeliverableStudentSummary | null;
  project: DeliverableProjectSummary | null;
  course: DeliverableCourseSummary | null;
};

export type EvaluationCriteria = {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  maxScore: number;
  sortOrder: number;
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
};

export type EvaluationScore = {
  id: string;
  evaluationId: string;
  criteriaId: string;
  score: number;
  comment: string | null;
  createdAt: string;
  criteria?: EvaluationCriteria | null;
};

export type Evaluation = {
  id: string;
  deliverableId: string;
  mentorId: string;
  status: EvaluationStatus;
  decision: EvaluationDecision | null;
  score: number | null;
  rubricSnapshot: Record<string, unknown> | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Feedback = {
  id: string;
  evaluationId: string;
  deliverableId: string;
  authorId: string;
  summary: string;
  strengths: string | null;
  improvements: string | null;
  nextSteps: string;
  priority: FeedbackPriority;
  isVisibleToStudent: boolean;
  createdAt: string;
  updatedAt: string;
};

export type EvaluationDetail = Evaluation & {
  deliverable: DeliverableDetail | AdminDeliverable | null;
  mentor: DeliverableStudentSummary | null;
  feedback: Feedback | null;
  scores: EvaluationScore[];
};

export type FeedbackDetail = Feedback & {
  evaluation: Evaluation | null;
  deliverable: DeliverableDetail | AdminDeliverable | null;
  author: DeliverableStudentSummary | null;
};

export type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  href: string | null;
  readAt: string | null;
  createdAt: string;
};

export type MentorDeliverable = AdminDeliverable & {
  assignment: MentorAssignment | null;
  latestEvaluation: Evaluation | null;
  feedbackCount: number;
};

export type EvaluationActionState = {
  ok: boolean;
  message: string;
  redirectTo?: string;
  entityId?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};
