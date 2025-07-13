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

  const handleLogout = () => {
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    clearUser();
    router.push("/login");
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
