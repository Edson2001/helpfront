"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserStore } from "@/stores/userStore";
import { EmailSettings } from "./components/EmailSettings";
import { OrganizationForm } from "./components/OrganizationForm";
import { PlanDetails } from "./components/PlanDetails";
import { SlackSettings } from "./components/SlackSettings";
import { TeamsSettings } from "./components/TeamsSettings";
import { TelegramSettings } from "./components/TelegramSettings";
import { WidgetConfigForm } from "./components/WidgetConfigForm";

export default function ConfigPage() {
  const organizationData2 = {
    id: "355959c6-8986-4c31-bb16-e92d84609ff5",
    name: "Piteu Entregas",
    email: "geral@piteu.ao",
    OrganizationPlan: [
      {
        id: "3b507bb3-687f-424f-998b-d411139f0db4",
        organizationId: "355959c6-8986-4c31-bb16-e92d84609ff5",
        planId: "98277bba-f000-4cc6-98ca-a415d6ea06a0",
        startDate: "2025-07-16T19:12:56.163Z",
        expiresAt: "2026-07-16T19:12:56.160Z",
        isActive: true,
        paymentId: "0c2f6ee8-4f8c-4bf2-9906-c0585be1399d",
        plan: {
          id: "98277bba-f000-4cc6-98ca-a415d6ea06a0",
          title: "Plano Básico",
          monthlyPrice: 8000,
          annualPrice: 80000,
          durationMonths: 12,
          description: "Ideal para pequenas equipas ou startups",
          features: [
            "Até 3 utilizadores",
            "Suporte por e-mail",
            "5 tickets/mês",
          ],
          buttonText: "Assinar Básico",
          highlight: false,
          isActive: true,
          createdAt: "2025-07-16T15:36:24.150Z",
          updatedAt: "2025-07-16T15:36:24.150Z",
          organizationId: null,
        },
      },
    ],
    payments: [
      {
        id: "77e6872c-180c-481c-8fc8-d221cd3427ce",
        paymentReference: "PLAN_98277bba-f_9088",
        organizationId: "355959c6-8986-4c31-bb16-e92d84609ff5",
        planId: "98277bba-f000-4cc6-98ca-a415d6ea06a0",
        status: "pending",
        createdAt: "2025-07-16T19:09:29.090Z",
        updatedAt: "2025-07-16T19:09:29.090Z",
      },
      {
        id: "194a5a93-f417-4323-bcd2-de6ee70afc62",
        paymentReference: "PLAN_98277bba-f_1203",
        organizationId: "355959c6-8986-4c31-bb16-e92d84609ff5",
        planId: "98277bba-f000-4cc6-98ca-a415d6ea06a0",
        status: "pending",
        createdAt: "2025-07-16T19:12:01.205Z",
        updatedAt: "2025-07-16T19:12:01.205Z",
      },
      {
        id: "0c2f6ee8-4f8c-4bf2-9906-c0585be1399d",
        paymentReference: "PLAN_98277bba-f_1517",
        organizationId: "355959c6-8986-4c31-bb16-e92d84609ff5",
        planId: "98277bba-f000-4cc6-98ca-a415d6ea06a0",
        status: "completed",
        createdAt: "2025-07-16T19:12:41.519Z",
        updatedAt: "2025-07-16T19:12:55.344Z",
      },
    ],
  };

  const { user } = useUserStore((state) => state);
  const organizationData = (user as any)?.Organization;
  console.log(organizationData, "OLLL");
  return (
    <div className="">
      <Tabs defaultValue="geral" className="w-full p-3">
        <TabsList className="flex flex-row gap-2 border-b bg-transparent">
          <TabsTrigger
            value="geral"
            className="whitespace-nowrap px-4 py-2 text-sm font-medium data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            Geral
          </TabsTrigger>
          <TabsTrigger
            value="email"
            className="whitespace-nowrap px-4 py-2 text-sm font-medium data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            Email
          </TabsTrigger>
          <TabsTrigger
            value="widget"
            className="whitespace-nowrap px-4 py-2 text-sm font-medium data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            Widget
          </TabsTrigger>
          <TabsTrigger
            value="telegram"
            className="whitespace-nowrap px-4 py-2 text-sm font-medium data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            Telegram
          </TabsTrigger>
          <TabsTrigger
            value="slack"
            className="whitespace-nowrap px-4 py-2 text-sm font-medium data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            Slack
          </TabsTrigger>

          <TabsTrigger
            value="teams"
            className="whitespace-nowrap px-4 py-2 text-sm font-medium data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            Teams
          </TabsTrigger>
          <TabsTrigger
            value="plan"
            className="whitespace-nowrap px-4 py-2 text-sm font-medium data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            Plano e Pagamentos
          </TabsTrigger>
        </TabsList>

        <div className="p-4">
          <TabsContent value="geral">
            <OrganizationForm />
          </TabsContent>
          <TabsContent value="email">
            <EmailSettings />
          </TabsContent>
          <TabsContent value="widget">
            <WidgetConfigForm />
          </TabsContent>
          <TabsContent value="telegram">
            <TelegramSettings />
          </TabsContent>
          <TabsContent value="slack">
            <SlackSettings />
          </TabsContent>
          <TabsContent value="teams">
            <TeamsSettings />
          </TabsContent>
          <TabsContent value="plan">
            <PlanDetails
              organizationPlan={organizationData?.OrganizationPlan.find(
                (plan: any) => plan.isActive,
              )} // Filtra o plano ativo
              payments={organizationData?.payments}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
