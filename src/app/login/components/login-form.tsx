"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Turnstile from "react-turnstile";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useLogin } from "../hooks/useLogin";

// Definir o schema de validação com Zod
const loginSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
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

  const loginMutation = useLogin();
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  /* const { user, loading, error, fetchUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]); */
  const onSubmit = (data: LoginFormData) => {
    if (!token) {
      setError("Por favor, complete a verificação do Turnstile.");
      return;
    }
    loginMutation.mutate(
      { ...data },
      {
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
      },
    );
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
        <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Insira seu e-mail abaixo para fazer login na sua conta
        </p>
      </div>
      <div className="grid gap-6">
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
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <Button
          disabled={loginMutation.isPending}
          type="submit"
          className="w-full"
        >
          {loginMutation.isPending ? "Entrando..." : "Entrar"}
        </Button>
        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
          onVerify={(token) => setToken(token)}
          theme="light" // ou "dark"
          size="normal" // ou "compact"
        />
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground"></span>
        </div>
      </div>
      <div className="text-center text-sm">
        Não tem uma conta?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
