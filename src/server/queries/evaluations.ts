import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@/db/client";
import {
  courses,
  deliverables,
  evaluationCriteria,
  evaluations,
  evaluationScores,
  feedback,
  mentorAssignments,
  notifications,
  profiles,
  studentProjects,
} from "@/db/schema";
import {
  REVIEWABLE_DELIVERABLE_STATUSES,
  type NotificationType,
} from "@/constants/evaluations";
import type {
  EvaluationInput,
  FeedbackInput,
  MentorAssignmentInput,
} from "@/lib/validations/evaluations";
import {
  getAdminDeliverableById,
  getAdminDeliverables,
  getDeliverableWithFiles,
} from "@/server/queries/deliverables";
import { EvaluationService } from "@/server/services/evaluation-service";
import { FeedbackService } from "@/server/services/feedback-service";
import { MentorAssignmentService } from "@/server/services/mentor-assignment-service";
import { NotificationService } from "@/server/services/notification-service";
import type {
  Evaluation,
  EvaluationCriteria,
  EvaluationDetail,
  EvaluationScore,
  Feedback,
  FeedbackDetail,
  MentorAssignment,
  MentorAssignmentDetail,
  MentorDeliverable,
  Notification,
} from "@/types/evaluations";
import type {
  DeliverableCourseSummary,
  DeliverableProjectSummary,
  DeliverableStudentSummary,
} from "@/types/deliverables";

type ProfileRow = typeof profiles.$inferSelect;
type CourseRow = typeof courses.$inferSelect;
type ProjectRow = typeof studentProjects.$inferSelect;
type AssignmentRow = typeof mentorAssignments.$inferSelect;
type CriteriaRow = typeof evaluationCriteria.$inferSelect;
type EvaluationRow = typeof evaluations.$inferSelect;
type FeedbackRow = typeof feedback.$inferSelect;
type NotificationRow = typeof notifications.$inferSelect;

function toIso(value: Date | null) {
  return value ? value.toISOString() : null;
}

function emptyToNull(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function mapProfile(row: ProfileRow | null | undefined): DeliverableStudentSummary | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    fullName: row.fullName,
    email: row.email,
  };
}

function mapProject(row: ProjectRow | null | undefined): DeliverableProjectSummary | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
  };
}

function mapCourse(row: CourseRow | null | undefined): DeliverableCourseSummary | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
  };
}

function mapAssignment(row: AssignmentRow): MentorAssignment {
  return {
    id: row.id,
    mentorId: row.mentorId,
    studentId: row.studentId,
    projectId: row.projectId,
    courseId: row.courseId,
    assignedBy: row.assignedBy,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapCriteria(row: CriteriaRow): EvaluationCriteria {
  return {
    id: row.id,
    courseId: row.courseId,
    title: row.title,
    description: row.description,
    maxScore: row.maxScore,
    sortOrder: row.sortOrder,
    isRequired: row.isRequired,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapEvaluation(row: EvaluationRow): Evaluation {
  return {
    id: row.id,
    deliverableId: row.deliverableId,
    mentorId: row.mentorId,
    status: row.status,
    decision: row.decision,
    score: row.score,
    rubricSnapshot: row.rubricSnapshot,
    reviewedAt: toIso(row.reviewedAt),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapFeedback(row: FeedbackRow): Feedback {
  return {
    id: row.id,
    evaluationId: row.evaluationId,
    deliverableId: row.deliverableId,
    authorId: row.authorId,
    summary: row.summary,
    strengths: row.strengths,
    improvements: row.improvements,
    nextSteps: row.nextSteps,
    priority: row.priority,
    isVisibleToStudent: row.isVisibleToStudent,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapNotification(row: NotificationRow): Notification {
  return {
    id: row.id,
    userId: row.userId,
    type: row.type,
    title: row.title,
    message: row.message,
    href: row.href,
    readAt: toIso(row.readAt),
    createdAt: row.createdAt.toISOString(),
  };
}

async function findProfileById(profileId: string) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, profileId))
    .limit(1);

  return row ?? null;
}

async function findProjectById(projectId: string | null) {
  if (!projectId) {
    return null;
  }

  const db = getDb();
  const [row] = await db
    .select()
    .from(studentProjects)
    .where(eq(studentProjects.id, projectId))
    .limit(1);

  return row ?? null;
}

async function findCourseById(courseId: string | null) {
  if (!courseId) {
    return null;
  }

  const db = getDb();
  const [row] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  return row ?? null;
}

async function hydrateAssignment(row: AssignmentRow): Promise<MentorAssignmentDetail> {
  const [mentor, student, project, course] = await Promise.all([
    findProfileById(row.mentorId),
    findProfileById(row.studentId),
    findProjectById(row.projectId),
    findCourseById(row.courseId),
  ]);

  return {
    ...mapAssignment(row),
    mentor: mapProfile(mentor),
    student: mapProfile(student),
    project: mapProject(project),
    course: mapCourse(course),
  };
}

async function getFeedbackForEvaluation(evaluationId: string) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(feedback)
    .where(eq(feedback.evaluationId, evaluationId))
    .orderBy(desc(feedback.createdAt))
    .limit(1);

  return row ? mapFeedback(row) : null;
}

async function getScoresForEvaluation(evaluationId: string): Promise<EvaluationScore[]> {
  const db = getDb();
  const rows = await db
    .select({ score: evaluationScores, criteria: evaluationCriteria })
    .from(evaluationScores)
    .leftJoin(
      evaluationCriteria,
      eq(evaluationCriteria.id, evaluationScores.criteriaId),
    )
    .where(eq(evaluationScores.evaluationId, evaluationId))
    .orderBy(asc(evaluationScores.createdAt));

  return rows.map((row) => ({
    id: row.score.id,
    evaluationId: row.score.evaluationId,
    criteriaId: row.score.criteriaId,
    score: row.score.score,
    comment: row.score.comment,
    createdAt: row.score.createdAt.toISOString(),
    criteria: row.criteria ? mapCriteria(row.criteria) : null,
  }));
}

async function hydrateEvaluation(row: EvaluationRow): Promise<EvaluationDetail> {
  const [deliverable, mentor, evaluationFeedback, scores] = await Promise.all([
    getAdminDeliverableById(row.deliverableId),
    findProfileById(row.mentorId),
    getFeedbackForEvaluation(row.id),
    getScoresForEvaluation(row.id),
  ]);

  return {
    ...mapEvaluation(row),
    deliverable,
    mentor: mapProfile(mentor),
    feedback: evaluationFeedback,
    scores,
  };
}

async function hydrateFeedback(row: FeedbackRow): Promise<FeedbackDetail> {
  const [deliverable, author, evaluationRow] = await Promise.all([
    getAdminDeliverableById(row.deliverableId),
    findProfileById(row.authorId),
    getEvaluationRecordById(row.evaluationId),
  ]);

  return {
    ...mapFeedback(row),
    deliverable,
    author: mapProfile(author),
    evaluation: evaluationRow,
  };
}

export async function getEvaluationCriteriaByCourse(courseId: string) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(evaluationCriteria)
    .where(eq(evaluationCriteria.courseId, courseId))
    .orderBy(asc(evaluationCriteria.sortOrder), asc(evaluationCriteria.title));

  return rows.map(mapCriteria);
}

export async function getMentorAssignments(mentorId?: string) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = mentorId
    ? await db
        .select()
        .from(mentorAssignments)
        .where(eq(mentorAssignments.mentorId, mentorId))
        .orderBy(desc(mentorAssignments.updatedAt))
    : await db
        .select()
        .from(mentorAssignments)
        .orderBy(desc(mentorAssignments.updatedAt));

  return Promise.all(rows.map(hydrateAssignment));
}

export async function getActiveAssignmentsForMentor(mentorId: string) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(mentorAssignments)
    .where(
      and(
        eq(mentorAssignments.mentorId, mentorId),
        eq(mentorAssignments.status, "active"),
      ),
    )
    .orderBy(desc(mentorAssignments.updatedAt));

  return rows.map(mapAssignment);
}

export async function getMatchingAssignmentForDeliverable(
  mentorId: string,
  deliverableId: string,
) {
  const [deliverable, assignments] = await Promise.all([
    getDeliverableWithFiles(deliverableId),
    getActiveAssignmentsForMentor(mentorId),
  ]);

  if (!deliverable) {
    return null;
  }

  return (
    assignments.find((assignment) =>
      MentorAssignmentService.matchesDeliverable(assignment, deliverable),
    ) ?? null
  );
}

export async function insertMentorAssignment(
  input: MentorAssignmentInput,
  assignedBy: string,
) {
  const db = getDb();
  const [row] = await db
    .insert(mentorAssignments)
    .values({
      mentorId: input.mentorId,
      studentId: input.studentId,
      projectId: input.projectId ?? null,
      courseId: input.courseId ?? null,
      assignedBy,
      status: input.status,
      updatedAt: new Date(),
    })
    .returning();

  return hydrateAssignment(row);
}

export async function getMentorDeliverables(mentorId: string): Promise<MentorDeliverable[]> {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const [deliverableItems, assignments] = await Promise.all([
    getAdminDeliverables(),
    getActiveAssignmentsForMentor(mentorId),
  ]);

  const assigned = deliverableItems.filter((deliverable) =>
    assignments.some((assignment) =>
      MentorAssignmentService.matchesDeliverable(assignment, deliverable),
    ),
  );

  const withReviewState = await Promise.all(
    assigned.map(async (deliverable) => {
      const [latestEvaluation, feedbackItems] = await Promise.all([
        getEvaluationByDeliverable(deliverable.id),
        getFeedbackByDeliverable(deliverable.id),
      ]);

      return {
        ...deliverable,
        assignment:
          assignments.find((assignment) =>
            MentorAssignmentService.matchesDeliverable(assignment, deliverable),
          ) ?? null,
        latestEvaluation,
        feedbackCount: feedbackItems.length,
      };
    }),
  );

  return withReviewState;
}

export async function getReviewQueueForMentor(mentorId: string) {
  const items = await getMentorDeliverables(mentorId);

  return items.filter((item) =>
    REVIEWABLE_DELIVERABLE_STATUSES.includes(
      item.status as (typeof REVIEWABLE_DELIVERABLE_STATUSES)[number],
    ),
  );
}

export async function startEvaluationRecord(
  deliverableId: string,
  mentorId: string,
) {
  const db = getDb();
  const now = new Date();
  const [existing] = await db
    .select()
    .from(evaluations)
    .where(
      and(
        eq(evaluations.deliverableId, deliverableId),
        eq(evaluations.mentorId, mentorId),
        eq(evaluations.status, "in_progress"),
      ),
    )
    .orderBy(desc(evaluations.updatedAt))
    .limit(1);

  if (existing) {
    return hydrateEvaluation(existing);
  }

  const [row] = await db
    .insert(evaluations)
    .values({
      deliverableId,
      mentorId,
      status: "in_progress",
      updatedAt: now,
    })
    .returning();

  await db
    .update(deliverables)
    .set({ status: "under_review", updatedAt: now })
    .where(eq(deliverables.id, deliverableId));

  return hydrateEvaluation(row);
}

export async function submitEvaluationRecord(
  deliverableId: string,
  mentorId: string,
  input: EvaluationInput,
) {
  const db = getDb();
  const now = new Date();
  const normalizedFeedback = FeedbackService.normalize(input.feedback);
  const decisionStatus = EvaluationService.deliverableStatusForDecision(
    input.decision,
  );
  const deliverable = await getDeliverableWithFiles(deliverableId);

  if (!deliverable) {
    return null;
  }

  const [row] = await db.transaction(async (tx) => {
    const [current] = await tx
      .select()
      .from(evaluations)
      .where(
        and(
          eq(evaluations.deliverableId, deliverableId),
          eq(evaluations.mentorId, mentorId),
          inArray(evaluations.status, ["pending", "in_progress"]),
        ),
      )
      .orderBy(desc(evaluations.updatedAt))
      .limit(1);

    const values = {
      deliverableId,
      mentorId,
      status: "completed" as const,
      decision: input.decision,
      score: input.score ?? null,
      rubricSnapshot: EvaluationService.buildRubricSnapshot(input),
      reviewedAt: now,
      updatedAt: now,
    };

    const [evaluationRow] = current
      ? await tx
          .update(evaluations)
          .set(values)
          .where(eq(evaluations.id, current.id))
          .returning()
      : await tx.insert(evaluations).values(values).returning();

    await tx.insert(feedback).values({
      evaluationId: evaluationRow.id,
      deliverableId,
      authorId: mentorId,
      ...normalizedFeedback,
      updatedAt: now,
    });

    if (input.criteriaScores?.length) {
      await tx.insert(evaluationScores).values(
        input.criteriaScores.map((score) => ({
          evaluationId: evaluationRow.id,
          criteriaId: score.criteriaId,
          score: score.score,
          comment: emptyToNull(score.comment),
        })),
      );
    }

    await tx
      .update(deliverables)
      .set({ status: decisionStatus, updatedAt: now })
      .where(eq(deliverables.id, deliverableId));

    await tx.insert(notifications).values({
      userId: deliverable.studentId,
      type: NotificationService.typeForDecision(input.decision),
      title: NotificationService.titleForDecision(input.decision),
      message: NotificationService.messageForDecision(input.decision, deliverable),
      href: NotificationService.hrefForDeliverableFeedback(deliverableId),
    });

    return [evaluationRow];
  });

  return row ? hydrateEvaluation(row) : null;
}

export async function getEvaluationRecordById(evaluationId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const db = getDb();
  const [row] = await db
    .select()
    .from(evaluations)
    .where(eq(evaluations.id, evaluationId))
    .limit(1);

  return row ? mapEvaluation(row) : null;
}

export async function getEvaluationByDeliverable(deliverableId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const db = getDb();
  const [row] = await db
    .select()
    .from(evaluations)
    .where(eq(evaluations.deliverableId, deliverableId))
    .orderBy(desc(evaluations.updatedAt))
    .limit(1);

  return row ? hydrateEvaluation(row) : null;
}

export async function getEvaluationHistory(deliverableId: string) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(evaluations)
    .where(eq(evaluations.deliverableId, deliverableId))
    .orderBy(desc(evaluations.updatedAt));

  return Promise.all(rows.map(hydrateEvaluation));
}

export async function getMentorEvaluationHistory(mentorId: string) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(evaluations)
    .where(eq(evaluations.mentorId, mentorId))
    .orderBy(desc(evaluations.updatedAt));

  return Promise.all(rows.map(hydrateEvaluation));
}

export async function getFeedbackByDeliverable(deliverableId: string) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(feedback)
    .where(eq(feedback.deliverableId, deliverableId))
    .orderBy(desc(feedback.createdAt));

  return Promise.all(rows.map(hydrateFeedback));
}

export async function getFeedbackRecordById(feedbackId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const db = getDb();
  const [row] = await db
    .select()
    .from(feedback)
    .where(eq(feedback.id, feedbackId))
    .limit(1);

  return row ? hydrateFeedback(row) : null;
}

export async function insertFeedbackRecord(input: {
  evaluationId: string;
  deliverableId: string;
  authorId: string;
  feedback: FeedbackInput;
}) {
  const db = getDb();
  const normalized = FeedbackService.normalize(input.feedback);
  const [row] = await db
    .insert(feedback)
    .values({
      evaluationId: input.evaluationId,
      deliverableId: input.deliverableId,
      authorId: input.authorId,
      ...normalized,
      updatedAt: new Date(),
    })
    .returning();

  return hydrateFeedback(row);
}

export async function updateFeedbackRecord(
  feedbackId: string,
  input: FeedbackInput,
) {
  const db = getDb();
  const normalized = FeedbackService.normalize(input);
  const [row] = await db
    .update(feedback)
    .set({
      ...normalized,
      updatedAt: new Date(),
    })
    .where(eq(feedback.id, feedbackId))
    .returning();

  return row ? hydrateFeedback(row) : null;
}

export async function getStudentFeedback(studentId: string) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select({ feedback })
    .from(feedback)
    .innerJoin(deliverables, eq(deliverables.id, feedback.deliverableId))
    .where(
      and(
        eq(deliverables.studentId, studentId),
        eq(feedback.isVisibleToStudent, true),
      ),
    )
    .orderBy(desc(feedback.createdAt));

  return Promise.all(rows.map((row) => hydrateFeedback(row.feedback)));
}

export async function createNotification(input: {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  href?: string | null;
}) {
  const db = getDb();
  const [row] = await db
    .insert(notifications)
    .values({
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      href: input.href ?? null,
    })
    .returning();

  return mapNotification(row);
}

export async function getUserNotifications(userId: string) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(10);

  return rows.map(mapNotification);
}

export async function markNotificationRead(notificationId: string, userId: string) {
  const db = getDb();
  const [row] = await db
    .update(notifications)
    .set({ readAt: new Date() })
    .where(
      and(
        eq(notifications.id, notificationId),
        eq(notifications.userId, userId),
      ),
    )
    .returning();

  return row ? mapNotification(row) : null;
}
