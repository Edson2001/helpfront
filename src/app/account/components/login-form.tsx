"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreate } from "@/app/account/hooks/useCreate";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Definir o schema de validação com Zod
const loginSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido."),
  phoneNumber: z.string().min(9, "O número deve ter pelo menos 9 caracteres."),
  name: z.string().min(6, "O nome deve ter pelo menos 6 caracteres."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useCreate();
  const [error, setError] = useState<string | null>(null);
  /* const { user, loading, error, fetchUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]); */
  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onError: (error: any) => {
        if (error.response?.status === 401) {
          setError(
            error.response?.data?.message ??
              "Credenciais inválidas. Por favor, tente novamente.",
          );
        } else {
          setError(
            "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.",
          );
        }
      },
      onSuccess: () => {
        setError(null);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Crie sua conta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Insira seus dados abaixo para criar uma nova conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Nome</Label>
          <Input
            id="name"
            type="name"
            placeholder="empresa"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@exemplo.com"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Telefone</Label>
          <Input
            id="phoneNumber"
            type="phoneNumber"
            placeholder="+244924467054"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <span className="text-sm text-red-500">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>

        <Button
          disabled={loginMutation.isPending}
          type="submit"
          className="w-full"
        >
          {loginMutation.isPending ? "Criando conta..." : "Criar conta"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground"></span>
        </div>
      </div>
      <div className="text-center text-sm">
        Já tem uma conta?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Faça login
        </Link>
      </div>
    </form>
  );
}
