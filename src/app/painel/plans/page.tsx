"use client";

import React, { useState } from "react";
import { PricingCard } from "@/app/home/components/Pricing";
import { useGeneratePayment } from "./hooks/useGeneratePayment";
import { usePlans } from "./hooks/usePlans";
import { useUserStore } from "@/stores/userStore";

export default function PlansPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { data: plans, isLoading, error } = usePlans();

  const {user} = useUserStore((state)=> state)
  
  const { mutate: generatePayment, isPending } = useGeneratePayment();

  const handleSubscribe = async (planId: string) => {
    try {
      // Obter os dados do usuário logado
     /*  const userResponse = await fetch("/api/user", {
        method: "GET",
        credentials: "include", // Inclui cookies na requisição
      });

      if (!userResponse.ok) {
        throw new Error("Erro ao obter dados do usuário");
      } */

     // const { user } = await userResponse.json();
      console.log(user, "LOLLLLL")
      // Usar os dados do usuário para o pagamento
      /* const customerData = {
        firstName: user?.firstName || "Nome", // Substitua pelo campo correto
        lastName: user?.lastName || "Sobrenome", // Substitua pelo campo correto
        email: user?.email || "email@exemplo.com", // Substitua pelo campo correto
        phone: user?.phone || "912345678", // Substitua pelo campo correto
      };
 */
      generatePayment(
        { planId, customerData: user, isAnnual },
        {
          onSuccess: (data) => {
            console.log(data?.data?.redirect_url, "/////////");
            window.location.href = data?.data?.redirect_url;
          },
          onError: (error) => {
            alert(`Erro ao gerar pagamento: ${error.message}`);
          },
        },
      );
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      alert("Erro ao processar pagamento. Tente novamente.");
    }
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
      <div className="flex flex-wrap justify-center">
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
