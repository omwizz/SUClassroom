import { loginUser } from "@/server/actions/auth-actions";
import { apiError, apiSuccess, readJsonBody } from "@/server/api/responses";

function asRecord(value: unknown) {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const body = asRecord(await readJsonBody(request));

  if (!body) {
    return apiError("Envia un cuerpo JSON valido.", { status: 400 });
  }

  const result = await loginUser({
    email: asString(body.email),
    password: asString(body.password),
  });

  if (!result.ok) {
    return apiError(result.message, { status: 401 });
  }

  return apiSuccess(
    {
      redirectTo: result.redirectTo,
    },
    {
      message: result.message,
    },
  );
}
