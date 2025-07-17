import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function TelegramSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Configurações do Telegram</h2>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch id="telegram-enable" />
          <Label htmlFor="telegram-enable">
            Ativar integração com Telegram
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bot-token">Token do Bot</Label>
        <Input
          id="bot-token"
          placeholder="Ex: 123456789:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
          type="password"
        />
        <p className="text-sm text-muted-foreground">
          Obtenha no @BotFather no Telegram
        </p>
      </div>

      

      <div className="pt-4">
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Salvar Configurações
        </button>
      </div>
    </div>
  );
}
