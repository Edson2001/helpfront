import { Gauge, type LucideIcon, MessagesSquare, Users2, Settings, Wallet } from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "RedHelp",
  description: "Ajuda a tempo e hora.",
};

export const navigations: Navigation[] = [
  {
    icon: Gauge,
    name: "Painel",
    href: "/painel",
  },
  {
    icon: MessagesSquare,
    name: "Ticket",
    href: "/painel/ticket",
  },
  {
    icon: Users2,
    name: "Utilizadores",
    href: "/painel/users",
  },
  {
    icon: Settings,
    name: "Configurações",
    href: "/painel/config",
  },
  {
    icon: Wallet,
    name: "Planos",
    href: "/painel/plans",
  },
];
