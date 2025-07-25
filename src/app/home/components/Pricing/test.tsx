"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHeader from "../Common/SectionHeader";
import AddOns from "./AddOns";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="pt-15 lg:pb-25 xl:pb-30 overflow-hidden pb-20">
      <div className="max-w-c-1315 mx-auto px-4 md:px-8 xl:px-0">
        <div className="animate_top mx-auto text-center">
          <SectionHeader
            headerInfo={{
              title: `PLANOS DE PREÇOS`,
              subtitle: `Soluções para Todos os Tamanhos`,
              description: `Escolha o plano ideal para otimizar seu atendimento ao cliente e escalar seu negócio.`,
            }}
          />
          <div className="mt-6 flex justify-center">
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
        </div>
      </div>

      <div className="mt-15 relative mx-auto max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="-bottom-15 -z-1 absolute h-full w-full">
          <Image
            fill
            src="./images/shape/shape-dotted-light.svg"
            alt="Dotted"
            className="dark:hidden"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 lg:flex-nowrap xl:gap-5">
          {/* Gratuito */}
          <PricingCard
            title="Gratuito"
            price={isAnnual ? "0 Kz" : "0 Kz"}
            description="Ideal para pequenas equipes começando com atendimento"
            features={["1 agente", "Até 3 tickets ativos", "Sem histórico"]}
            buttonText="Começar Agora"
          />

          {/* Básico */}
          <PricingCard
            title="Básico"
            price={
              isAnnual
                ? `${(4250 * 12).toLocaleString("pt-PT")} Kz`
                : "4.250 Kz"
            }
            description="Para equipes que precisam de recursos essenciais"
            features={[
              "Até 3 agentes",
              "Histórico completo",
              "Relatórios simples",
            ]}
            highlight
            buttonText="Assinar Plano"
          />

          {/* Profissional */}
          <PricingCard
            title="Profissional"
            price={
              isAnnual
                ? `${(8500 * 12).toLocaleString("pt-PT")} Kz / agente`
                : "8.500 Kz / agente"
            }
            description="Para equipes que exigem mais produtividade"
            features={[
              "Agentes ilimitados",
              "SLA e automações",
              "Respostas rápidas",
            ]}
            buttonText="Assinar Plano"
          />

          {/* Avançado */}
          <PricingCard
            title="Avançado"
            price={
              isAnnual
                ? `${(17000 * 12).toLocaleString("pt-PT")} Kz / agente`
                : "17.000 Kz / agente"
            }
            description="Para empresas que precisam de recursos completos"
            features={[
              "Base de conhecimento",
              "Integrações avançadas",
              "Relatórios detalhados",
              "Perfis personalizados",
            ]}
            buttonText="Assinar Plano"
          />
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  highlight = false,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
}) => (
  <div className="animate_top border-stroke p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection xl:p-12.5 group relative rounded-lg border bg-white dark:shadow-none md:w-[45%] lg:w-1/3">
    {highlight && (
      <div className="top-7.5 px-4.5 text-metatitle absolute -right-3.5 -rotate-90 rounded-bl-full rounded-tl-full bg-primary py-1.5 font-medium uppercase text-white">
        popular
      </div>
    )}

    <h3 className="mb-7.5 xl:text-sectiontitle3 text-3xl font-bold text-black dark:text-white">
      {price}
      <span className="text-regular text-waterloo dark:text-manatee">
        {" "}
        /mês
      </span>
    </h3>
    <h4 className="text-para2 mb-2.5 font-medium text-black dark:text-white">
      {title}
    </h4>
    <p>{description}</p>

    <div className="border-stroke pb-12.5 dark:border-strokedark mt-9 border-t pt-9">
      <ul>
        {features.map((item, index) => (
          <li
            key={index}
            className="dark:text-manatee mb-4 text-black last:mb-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
        
    <button className="group/btn inline-flex items-center gap-2.5 font-medium text-primary transition-all duration-300 dark:text-white dark:hover:text-primary">
      <span className="duration-300 group-hover/btn:pr-2">{buttonText}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z"
          fill="currentColor"
        />
      </svg>
    </button>
  </div>
);

export default Pricing;
