import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/features/auth/components/auth-shell";

export default function VerifyEmailPage() {
  return (
    <AuthShell
      title="Verifica tu email"
      description="Tu cuenta queda lista cuando confirmas el enlace enviado por Supabase."
      footer={
        <Link className="font-medium text-primary hover:underline" href="/login">
          Ir a login
        </Link>
      }
    >
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-5 text-sm text-muted-foreground">
        <MailCheck className="mb-3 size-5 text-primary" />
        Revisa tu bandeja de entrada. Si Supabase tiene confirmación de email
        activa, el acceso quedará habilitado al confirmar el enlace.
      </div>
      <Button asChild className="mt-4 w-full">
        <Link href="/login">Entrar cuando esté verificado</Link>
      </Button>
    </AuthShell>
  );
}
