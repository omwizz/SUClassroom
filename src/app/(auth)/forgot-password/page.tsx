import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/features/auth/components/auth-shell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Recuperar contraseña"
      description="El flujo de recuperación queda preparado para conectarse a Supabase Auth."
      footer={
        <Link className="font-medium text-primary hover:underline" href="/login">
          Volver a iniciar sesión
        </Link>
      }
    >
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-5 text-sm text-muted-foreground">
        <MailCheck className="mb-3 size-5 text-primary" />
        Próxima fase: formulario de email y envío de enlace seguro de
        recuperación mediante Supabase.
      </div>
      <Button asChild className="mt-4 w-full" variant="secondary">
        <Link href="/login">Volver</Link>
      </Button>
    </AuthShell>
  );
}
