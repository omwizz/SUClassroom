import { redirect } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { OnboardingWizard } from "@/features/projects/components/onboarding-wizard";
import { requireRole } from "@/server/guards/role-guard";
import { findStudentOnboarding } from "@/server/queries/projects";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const profile = await requireRole(["student"]);
  const onboarding = await findStudentOnboarding(profile.id);

  if (onboarding?.completedAt) {
    redirect("/dashboard/student");
  }

  return (
    <main className="min-h-dvh bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <PageHeader
          description="Completa tu diagnostico inicial y registra una ficha base de proyecto antes de entrar al dashboard."
          eyebrow="Inicio alumno"
          title="Onboarding SUClassroom"
        />
        <Card className="glass-panel rounded-lg">
          <CardContent className="p-5 sm:p-6">
            <OnboardingWizard />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

