"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useConfirmAccount } from "../hooks/useConfirmAccount";
import { useRequestNewConfirmation } from "../hooks/useRequestNewConfirmation";

// Importa o novo hook

// Definir o schema de validação com Zod
const validationSchema = z
  .object({
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z
      .string()
      .min(6, "A confirmação da senha deve ter pelo menos 6 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ValidationFormData = z.infer<typeof validationSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationFormData>({
    resolver: zodResolver(validationSchema),
  });

  const { token } = useParams(); // Captura o token da URL
  const confirmAccountMutation = useConfirmAccount();
  const requestNewConfirmationMutation = useRequestNewConfirmation(); // Usa o novo hook
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState(""); // Estado para armazenar o e-mail

  const onSubmit = (data: ValidationFormData) => {
    // Inclui o token na requisição
    confirmAccountMutation.mutate(
      { ...data, token },
      {
        onError: (error: any) => {
          setError(
            error?.response?.data?.message ??
              "Ocorreu um erro ao tentar validar a conta. Tente novamente mais tarde.",
          );
        },
        onSuccess: () => {
          setError(null);
        },
      },
    );
  };

  const handleRequestNewToken = () => {
    if (!email) {
      setError("Por favor, insira seu e-mail para solicitar um novo token.");
      return;
    }

    requestNewConfirmationMutation.mutate(
      { email },
      {
        onError: (error: any) => {
          setError(
            error?.response?.data?.message ??
              "Ocorreu um erro ao solicitar um novo token. Tente novamente mais tarde.",
          );
        },
        onSuccess: () => {
          setError(null);
          setError(
            "Um novo token foi enviado para o seu e-mail.",
          );
         /// alert("Um novo token foi enviado para o seu e-mail.");
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
        <h1 className="text-2xl font-bold">Valide sua conta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Insira sua senha para validar sua conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <Button
          disabled={confirmAccountMutation.isPending}
          type="submit"
          className="w-full"
        >
          {confirmAccountMutation.isPending ? "Validando..." : "Validar Conta"}
        </Button>
        <div className="grid gap-3">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="button"
            onClick={handleRequestNewToken}
            disabled={requestNewConfirmationMutation.isPending}
            className="w-full"
          >
            {requestNewConfirmationMutation.isPending
              ? "Solicitando..."
              : "Solicitar Novo Token"}
          </Button>
        </div>
      </div>
    </form>
  );
}
