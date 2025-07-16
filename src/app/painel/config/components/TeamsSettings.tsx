import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function TeamsSettings() {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Configurações do Microsoft Teams</h2>
  
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="teams-enable" />
            <Label htmlFor="teams-enable">Ativar integração com Microsoft Teams</Label>
          </div>
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="teams-webhook-url">Webhook URL</Label>
          <Input
            id="teams-webhook-url"
            placeholder="https://outlook.office.com/webhook/..."
            type="url"
          />
          <p className="text-sm text-muted-foreground">
            Crie um Webhook no canal do Teams em{" "}
            <a
              href="https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook"
              target="_blank"
              className="underline"
            >
              Microsoft Docs
            </a>
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
  