import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PlanDetailsProps {
  organizationPlan: {
    id: string;
    plan: {
      title: string;
      description: string;
      features: string[];
      monthlyPrice: number;
      annualPrice: number;
      durationMonths: number;
    };
    startDate: string;
    expiresAt: string;
    isActive: boolean;
  };
  payments: Array<{
    id: string;
    paymentReference: string;
    status: string;
    amount: number; // Adicione esta linha
    createdAt: string;
    updatedAt: string;
  }>;
}

export function PlanDetails({ organizationPlan, payments }: PlanDetailsProps) {
  const [visiblePayments, setVisiblePayments] = useState(3); // Limite inicial de pagamentos exibidos

  const loadMorePayments = () => {
    setVisiblePayments((prev) => prev + 3); // Aumenta o limite em 3
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-500 to-blue-600">
          <CardTitle className="text-white">Plano Atual</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              {organizationPlan?.plan.title}
            </h2>
            <Badge
              variant={organizationPlan?.isActive ? "default" : "destructive"}
            >
              {organizationPlan?.isActive ? "Ativo" : "Inativo"}
            </Badge>
          </div>
          <p className="text-gray-600">{organizationPlan?.plan.description}</p>
          <Separator className="my-4" />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Recursos Inclusos</h3>
            <ul className="space-y-2 pl-5">
              {organizationPlan?.plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Preço Mensal</p>
              <p className="font-bold">
                {organizationPlan?.plan.monthlyPrice / 100} Kz
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Preço Anual</p>
              <p className="font-bold">
                {organizationPlan?.plan.annualPrice / 100} Kz
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duração</p>
              <p className="font-bold">
                {organizationPlan?.plan.durationMonths} meses
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Início</p>
              <p className="font-medium">
                {new Date(organizationPlan?.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Expira em</p>
              <p className="font-medium">
                {new Date(organizationPlan?.expiresAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-500 to-blue-600">
          <CardTitle className="text-white">Histórico de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {payments.length > 0 ? (
            [...payments]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .slice(0, visiblePayments) // Limita a exibição aos `visiblePayments`
              .map((payment, index) => (
                <div
                  key={payment.id}
                  className="rounded-lg border p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {index + 1}. Referência: {payment.paymentReference}
                    </p>
                    <Badge
                      variant={
                        payment.status === "completed" ? "default" : "secondary"
                      }
                    >
                      {payment.status === "completed"
                        ? "Concluído"
                        : "Pendente"}
                    </Badge>
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500">
                      Data: {new Date(payment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-center text-gray-500">
              Nenhum pagamento registrado.
            </p>
          )}
          {payments.length > visiblePayments && ( // Mostra o botão apenas se houver mais pagamentos
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                onClick={loadMorePayments}
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Ver mais
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
