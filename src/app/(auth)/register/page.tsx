import Link from "next/link";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Crea tu cuenta"
      description="Empieza con un rol base. El acceso admin debe asignarse internamente."
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link className="font-medium text-primary hover:underline" href="/login">
            Inicia sesión
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
