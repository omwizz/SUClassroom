import { requireApiProfile } from "@/server/api/auth";
import { apiError, apiSuccess } from "@/server/api/responses";
import { getProfiles } from "@/server/queries/profiles";

export async function GET(request: Request) {
  const auth = await requireApiProfile(request, ["admin"]);

  if (!auth.ok) {
    return apiError(auth.message, { status: auth.status });
  }

  return apiSuccess(await getProfiles());
}

export async function POST(request: Request) {
  const auth = await requireApiProfile(request, ["admin"]);

  if (!auth.ok) {
    return apiError(auth.message, { status: auth.status });
  }

  return apiError(
    "La creacion directa en /api/users esta bloqueada para no desincronizar Supabase Auth. Usa POST /api/auth/register.",
    { status: 409 },
  );
}
