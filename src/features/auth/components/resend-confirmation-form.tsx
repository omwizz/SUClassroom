"use client";

import { useMemo, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
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
  resendConfirmationSchema,
  type ResendConfirmationInput,
} from "@/lib/validations/auth";
import { resendConfirmationEmail } from "@/server/actions/auth-actions";

export function ResendConfirmationForm() {
  const searchParams = useSearchParams();
  const defaultEmail = useMemo(
    () => searchParams.get("email") ?? "",
    [searchParams],
  );
  const hasInvalidLink = searchParams.get("error") === "invalid-link";
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<ResendConfirmationInput>({
    resolver: zodResolver(resendConfirmationSchema),
    defaultValues: {
      email: defaultEmail,
    },
  });

  const serverError = form.formState.errors.root?.message;

  function onSubmit(values: ResendConfirmationInput) {
    form.clearErrors("root");
    setSuccessMessage("");

    startTransition(async () => {
      const result = await resendConfirmationEmail(values);

      if (!result.ok) {
        form.setError("root", { message: result.message });
        return;
      }

      setSuccessMessage(result.message);
    });
  }

  return (
    <div className="space-y-4">
      {hasInvalidLink ? (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>
            El enlace no es valido o ya expiro. Reenvia la verificacion y usa
            el ultimo correo recibido.
          </AlertDescription>
        </Alert>
      ) : null}

      {serverError ? (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      ) : null}

      {successMessage ? (
        <Alert>
          <CheckCircle2 className="size-4" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      ) : null}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <Button className="w-full" disabled={isPending} type="submit">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send aria-hidden="true" />
            )}
            Reenviar verificacion
          </Button>
        </form>
      </Form>
    </div>
  );
}
