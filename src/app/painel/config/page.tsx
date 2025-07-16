import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailSettings } from "./components/EmailSettings";
import { OrganizationForm } from "./components/OrganizationForm";
import { SlackSettings } from "./components/SlackSettings";
import { TeamsSettings } from "./components/TeamsSettings";
import { TelegramSettings } from "./components/TelegramSettings";
import { WidgetConfigForm } from "./components/WidgetConfigForm";

export default function ConfigPage() {
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
        </div>
      </Tabs>
    </div>
  );
}
