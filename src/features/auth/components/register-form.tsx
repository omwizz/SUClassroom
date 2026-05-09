"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertCircle, Loader2, UserPlus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLE_LABELS } from "@/constants/roles";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { registerUser } from "@/server/actions/auth-actions";

const registrationRoles = ["student", "mentor", "institution"] as const;

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "student",
    },
  });

  const serverError = form.formState.errors.root?.message;

  function onSubmit(values: RegisterInput) {
    form.clearErrors("root");

    startTransition(async () => {
      const result = await registerUser(values);

      if (!result.ok) {
        form.setError("root", { message: result.message });
        return;
      }

      router.push(result.redirectTo ?? "/verify-email");
      router.refresh();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {serverError ? (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        ) : null}

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input
                  autoComplete="name"
                  placeholder="Nombre y apellido"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  placeholder="tu@email.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contrasena</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-password"
                  placeholder="Minimo 8 caracteres"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol inicial</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {registrationRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {ROLE_LABELS[role]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <UserPlus aria-hidden="true" />
          )}
          Crear cuenta
        </Button>
      </form>
    </Form>
  );
}
