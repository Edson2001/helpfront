import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SlackSettings() {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Configurações do Slack</h2>
  
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="slack-enable" />
            <Label htmlFor="slack-enable">Ativar integração com Slack</Label>
          </div>
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="webhook-url">Webhook URL</Label>
          <Input
            id="webhook-url"
            placeholder="https://hooks.slack.com/services/XXX/YYY/ZZZ"
            type="url"
          />
          <p className="text-sm text-muted-foreground">
            Você pode criar um webhook no Slack em{" "}
            <a
              href="https://api.slack.com/messaging/webhooks"
              target="_blank"
              className="underline"
            >
              api.slack.com/messaging/webhooks
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
  