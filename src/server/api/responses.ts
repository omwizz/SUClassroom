import { NextResponse } from "next/server";

export type ApiSuccess<T> = {
  ok: true;
  data: T;
  message?: string;
};

export type ApiFailure = {
  ok: false;
  message: string;
  details?: unknown;
};

export function apiSuccess<T>(
  data: T,
  init?: {
    message?: string;
    status?: number;
  },
) {
  return NextResponse.json<ApiSuccess<T>>(
    {
      ok: true,
      data,
      message: init?.message,
    },
    { status: init?.status ?? 200 },
  );
}

export function apiError(
  message: string,
  init?: {
    details?: unknown;
    status?: number;
  },
) {
  return NextResponse.json<ApiFailure>(
    {
      ok: false,
      message,
      details: init?.details,
    },
    { status: init?.status ?? 400 },
  );
}

export async function readJsonBody(request: Request) {
  try {
    return (await request.json()) as unknown;
  } catch {
    return null;
  }
}
