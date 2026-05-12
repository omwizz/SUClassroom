import { hasDatabaseUrl } from "@/db/client";
import { requireApiProfile } from "@/server/api/auth";
import { apiError, apiSuccess } from "@/server/api/responses";
import { findCurrentStudentProject } from "@/server/queries/projects";

export async function GET(request: Request) {
  const auth = await requireApiProfile(request, ["student", "admin"]);

  if (!auth.ok) {
    return apiError(auth.message, { status: auth.status });
  }

  if (!hasDatabaseUrl()) {
    return apiError("DATABASE_URL no esta configurado.", { status: 503 });
  }

  return apiSuccess(await findCurrentStudentProject(auth.profile.id));
}
