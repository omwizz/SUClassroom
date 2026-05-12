import { requireApiProfile } from "@/server/api/auth";
import { apiError, apiSuccess } from "@/server/api/responses";

export async function GET(request: Request) {
  const auth = await requireApiProfile(request);

  if (!auth.ok) {
    return apiError(auth.message, { status: auth.status });
  }

  return apiSuccess({
    profile: auth.profile,
    user: {
      id: auth.user.id,
      email: auth.user.email,
      emailConfirmedAt: auth.user.email_confirmed_at,
    },
  });
}
