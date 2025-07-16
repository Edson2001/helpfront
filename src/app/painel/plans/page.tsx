"use client"
import React, { useState } from "react";
import { PricingCard } from "@/app/home/components/Pricing";
// Importa o componente principal de Pricing
import AddOns from "@/app/home/components/Pricing/AddOns";

// Importa o componente de AddOns

interface Plan {
  title: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
}

export default function PlansPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans: Plan[] = [
    {
      title: "Gratuito",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "Ideal para pequenas equipes começando com atendimento",
      features: ["1 agente", "Até 3 tickets ativos", "Sem histórico"],
      buttonText: "Começar Agora",
    },
    {
      title: "Básico",
      monthlyPrice: 4250,
      annualPrice: 4250 * 12 * 0.8, // 20% de desconto anual
      description: "Para equipes que precisam de recursos essenciais",
      features: ["Até 3 agentes", "Histórico completo", "Relatórios simples"],
      highlight: true,
      buttonText: "Assinar Plano",
    },
    {
      title: "Profissional",
      monthlyPrice: 8500,
      annualPrice: 8500 * 12 * 0.8, // 20% de desconto anual
      description: "Para equipes que exigem mais produtividade",
      features: ["Agentes ilimitados", "SLA e automações", "Respostas rápidas"],
      buttonText: "Assinar Plano",
    },
  ];

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
      <div className="flex flex-wrap justify-center">
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
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
          />
        ))}
      </div>
    </div>
  );
}
