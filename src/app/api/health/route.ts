import { hasDatabaseUrl } from "@/db/client";
import { hasSupabasePublicConfig } from "@/lib/supabase/env";
import { apiSuccess } from "@/server/api/responses";

export async function GET() {
  return apiSuccess({
    service: "SUClassroom API",
    supabaseConfigured: hasSupabasePublicConfig(),
    databaseConfigured: hasDatabaseUrl(),
  });
}
