import Link from "next/link";
import { Suspense } from "react";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { ResendConfirmationForm } from "@/features/auth/components/resend-confirmation-form";

export default function VerifyEmailPage() {
  return (
    <AuthShell
      title="Verifica tu email"
      description="Confirma tu cuenta para entrar al panel y continuar con tu ruta de ejecucion."
      footer={
        <Link className="font-medium text-primary hover:underline" href="/login">
          Ir a login
        </Link>
      }
    >
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-5 text-sm text-muted-foreground">
        <MailCheck className="mb-3 size-5 text-primary" />
        Revisa tu bandeja de entrada y usa el ultimo correo recibido. Los
        enlaces de verificacion son de un solo uso y pueden expirar.
      </div>
      <div className="mt-4">
        <Suspense fallback={null}>
          <ResendConfirmationForm />
        </Suspense>
      </div>
      <Button asChild className="mt-4 w-full" variant="secondary">
        <Link href="/login">Entrar cuando este verificado</Link>
      </Button>
    </AuthShell>
  );
}
