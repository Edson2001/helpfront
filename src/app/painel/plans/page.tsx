"use client";

import React, { useState } from "react";
import { PricingCard } from "@/app/home/components/Pricing";
import { useGeneratePayment } from "./hooks/useGeneratePayment";
import { usePlans } from "./hooks/usePlans";

export default function PlansPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { data: plans, isLoading, error } = usePlans();
  const { mutate: generatePayment, isPending } = useGeneratePayment();

  const handleSubscribe = (planId: string) => {
    // Simulando dados do cliente (substitua pelos dados reais do usuário)
    const customerData = {
      firstName: "Nome", // Substitua pelo nome do usuário logado
      lastName: "Sobrenome", // Substitua pelo sobrenome do usuário logado
      email: "email@exemplo.com", // Substitua pelo email do usuário logado
      phone: "912345678", // Substitua pelo telefone do usuário logado
    };

    generatePayment(
      { planId, customerData, isAnnual },
      {
        onSuccess: (data) => {
          console.log(data?.data?.redirect_url, "/////////");
          // Redirecionar para a URL de pagamento
          window.location.href = data?.data?.redirect_url;
        },
        onError: (error) => {
          alert(`Erro ao gerar pagamento: ${error.message}`);
        },
      },
    );
  };

  if (isLoading) {
    return <div>Carregando planos...</div>;
  }

  if (error) {
    return <div>Erro ao carregar planos: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold">Escolha seu Plano</h1>

      {/* Alternar entre mensal e anual */}
      <div className="mb-6 flex justify-center">
        <div className="flex items-center gap-4 rounded-full bg-gray-100 p-1 dark:bg-gray-800">
          <button
            onClick={() => setIsAnnual(false)}
            className={`rounded-full px-6 py-2 font-medium transition-all ${
              !isAnnual
                ? "bg-primary text-white"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`rounded-full px-6 py-2 font-medium transition-all ${
              isAnnual
                ? "bg-primary text-white"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Anual (Economize 20%)
          </button>
        </div>
      </div>

      {/* Lista de planos */}
      <div className="flex flex-wrap justify-center gap-6">
        {plans?.map((plan) => (
          <PricingCard
            key={plan.id}
            title={plan.title}
            price={
              isAnnual
                ? `${plan.annualPrice.toLocaleString("pt-AO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Kz/ano`
                : `${plan.monthlyPrice.toLocaleString("pt-AO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Kz/mês`
            }
            description={plan.description}
            features={plan.features}
            buttonText={plan.buttonText}
            highlight={plan.highlight}
            onButtonClick={() => handleSubscribe(plan.id)}
            disabled={isPending}
          />
        ))}
      </div>
    </div>
  );
}
