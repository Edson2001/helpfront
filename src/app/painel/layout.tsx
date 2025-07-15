/* import { TopNav } from "@/components/nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav title="Dashboard" />
      <main>{children}</main>
    </>
  );
}
 */
import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import { SideNav, TopNav } from "@/components/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
//import "@/style/globals.css";
 

const gabarito = Gabarito({ subsets: ["latin"], variable: "--font-gabarito" });

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("flex min-h-[100dvh]", gabarito.className)}>
      <SideNav />
      <div className="flex-grow overflow-auto">
        <TopNav title="RedHelp" />
        {children}
      </div>
    </div>
  );
}
