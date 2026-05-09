import Link from "next/link";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Crea tu cuenta"
      description="Empieza con un rol base, define tu punto de partida y convierte el aprendizaje en avance medible."
      footer={
        <>
          Ya tienes cuenta?{" "}
          <Link className="font-medium text-primary hover:underline" href="/login">
            Inicia sesion
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
