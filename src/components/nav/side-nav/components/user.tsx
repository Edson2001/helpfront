"use client"
import { useUserStore } from "@/stores/userStore";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function User() {
  const { user, error, fetchUser } = useUserStore();
  
  const roles: any = {
    "AGENT": "Agente",
    "CLIENT": "Cliente",
    "ADMIN": "Administrador"
  }

  return (
    <div className="flex h-16 items-center border-b border-border px-2">
      <div className="flex w-full items-center justify-between rounded-md px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-800">
        <div className="flex items-center">
          <Image
            src="/avatar.png"
            alt="User"
            className="mr-2 rounded-full"
            width={36}
            height={36}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{String(user?.name).substring(0,12)}...</span>
            <span className="text-xs text-muted-foreground">{roles[String(user?.role)] }</span>
          </div>
        </div>
        {/* <ChevronDown size={16} /> */}
      </div>
    </div>
  );
}
