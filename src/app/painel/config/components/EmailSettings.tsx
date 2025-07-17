import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function EmailSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de E-mail</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Seção SMTP (condicional) */}

        <div className="space-y-4">
          <h3 className="text-lg font-medium">SMTP</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtp-server">Servidor SMTP</Label>
              <Input id="smtp-server" placeholder="smtp.example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">Porta</Label>
              <Input id="smtp-port" type="number" placeholder="587" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtp-email">E-mail do remetente</Label>
              <Input
                id="smtp-email"
                type="email"
                placeholder="suporte@empresa.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-password">Senha</Label>
              <Input
                id="smtp-password"
                type="password"
                placeholder="********"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="smtp-ssl" />
            <Label htmlFor="smtp-ssl">Usar SSL/TLS</Label>
          </div>
        </div>

        {/* Seção de Notificações (sempre visível) */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notificações</h3>
          <div className="flex items-center space-x-2">
            <Switch id="notify-new-ticket" defaultChecked />
            <Label htmlFor="notify-new-ticket">
              Notificar sobre novos tickets
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="notify-ticket-reply" defaultChecked />
            <Label htmlFor="notify-ticket-reply">
              Notificar sobre respostas
            </Label>
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  );
}
