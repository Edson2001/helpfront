"use client";

import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

/* import { useToast } from "@/components/ui/use-toast";
 */
export function WidgetConfigForm() {
  // const { toast } = useToast();
  const widgetScript = `<script src="https://seusite.com/widget.js" data-slug="seu-slug"></script>`;

  const copyScript = () => {
    navigator.clipboard.writeText(widgetScript);
    toast("Script copiado!", { position: "top-center",  });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuração do Widget</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Texto do Botão</Label>
            <Input placeholder="💬 Suporte" name="buttonText" />
          </div>
          <div className="space-y-2">
            <Label>Título do Modal</Label>
            <Input placeholder="Reportar um Problema" name="modalTitle" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Cor do Botão</Label>
            <Input type="color" name="buttonColor" defaultValue="#1f2937" />
          </div>
          <div className="space-y-2">
            <Label>Cor do Cabeçalho</Label>
            <Input type="color" name="headerColor" defaultValue="#1f2937" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>URL do Logo</Label>
          <Input placeholder="https://..." name="logoUrl" />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="showPriority" defaultChecked />
          <Label htmlFor="showPriority">Mostrar Prioridade</Label>
        </div>

        <div className="space-y-2">
          <Label>Tema</Label>
          <select name="theme" className="w-full rounded border p-2">
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Mensagem de Sucesso</Label>
          <Input
            placeholder="Seu ticket foi registrado com sucesso!"
            name="successMessage"
          />
        </div>

        {/* Seção de Cópia do Script */}
        <div className="space-y-2">
          <Label>Instalação do Widget</Label>
          <div className="flex items-center gap-2">
            <Input
              value={widgetScript}
              readOnly
              className="flex-1 font-mono text-sm"
            />
            <Button onClick={copyScript} variant="secondary">
              Copiar
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Cole este script no &lt;head&gt; do seu site.
          </p>
        </div>

        <Button type="submit" className="mt-4">
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  );
}
