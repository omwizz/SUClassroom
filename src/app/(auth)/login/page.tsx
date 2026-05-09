import Link from "next/link";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      title="Inicia sesion"
      description="Vuelve a tu panel, revisa tu siguiente accion y continua el avance de tu proyecto."
      footer={
        <>
          No tienes cuenta?{" "}
          <Link className="font-medium text-primary hover:underline" href="/register">
            Crea una ahora
          </Link>
        </>
      }
    >
      <LoginForm />
      <Link
        className="mt-4 inline-flex text-sm text-muted-foreground hover:text-foreground"
        href="/forgot-password"
      >
        Recuperar contrasena
      </Link>
    </AuthShell>
  );
}
