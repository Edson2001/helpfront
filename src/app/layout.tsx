"use client";

import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/userStore";
import "@/style/globals.css";
import { Providers } from "./providers";

const gabarito = Gabarito({ subsets: ["latin"] });

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, error, fetchUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={cn("bg-background font-sans", gabarito.className)}>
        <Providers>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  );
}
