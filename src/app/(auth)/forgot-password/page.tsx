import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/features/auth/components/auth-shell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Recuperar contrasena"
      description="Prepara el acceso para volver a tu ruta y retomar el avance de tu proyecto."
      footer={
        <Link className="font-medium text-primary hover:underline" href="/login">
          Volver a iniciar sesion
        </Link>
      }
    >
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-5 text-sm text-muted-foreground">
        <MailCheck className="mb-3 size-5 text-primary" />
        Proxima fase: formulario de email y envio de enlace seguro de
        recuperacion mediante Supabase.
      </div>
      <Button asChild className="mt-4 w-full" variant="secondary">
        <Link href="/login">Volver</Link>
      </Button>
    </AuthShell>
  );
}
