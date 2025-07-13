"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import Container from "../container";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";

export default function TopNav({ title }: { title: string }) {
  const router = useRouter();
  const { clearUser } = useUserStore();

  const handleLogout = async () => {
    try {
      // Chama o endpoint de logout
      await fetch("/api/logout", { method: "GET" });

      // Limpa o estado do usuário no frontend
      clearUser();

      // Redireciona para a página de login
      router.push("/login");
    } catch (error) {
      console.error("Erro durante o logout:", error);
    }
  };

  return (
    <Container className="flex h-16 items-center justify-between border-b border-border">
      <h1 className="text-2xl font-medium">{title}</h1>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant={"outline"} onClick={handleLogout}>
          <LogOut />
        </Button>
      </div>
    </Container>
  );
}
