import { isUserRole } from "@/constants/roles";
import { registerUser } from "@/server/actions/auth-actions";
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

  const role = asString(body.role) || "student";
  const result = await registerUser({
    fullName: asString(body.fullName) || asString(body.name),
    email: asString(body.email),
    password: asString(body.password),
    role: isUserRole(role) && role !== "admin" ? role : "student",
  });

  if (!result.ok) {
    return apiError(result.message, {
      details: result.fieldErrors,
      status: 400,
    });
  }

  return apiSuccess(
    {
      redirectTo: result.redirectTo,
    },
    {
      message: result.message,
      status: 201,
    },
  );
}
