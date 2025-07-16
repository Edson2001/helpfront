"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHeader from "../Common/SectionHeader";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="overflow-hidden pb-20 pt-15 lg:pb-25 xl:pb-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
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

      <div className="relative mx-auto mt-15 max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="absolute -bottom-15 -z-1 h-full w-full">
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
                ? `${(4250 * 12).toLocaleString("pt-AO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Kz/ano`
                : "4.250 Kz/mês"
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
                ? `${(8500 * 12).toLocaleString("pt-AO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Kz/ano`
                : "8.500 Kz/mês"
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
                ? `${(17000 * 12).toLocaleString("pt-AO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Kz/ano`
                : "17.000 Kz/mês"
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

      {/* Seção de Add-ons */}
      <AddOns isAnnual={isAnnual} />
    </section>
  );
};

export const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  highlight = false,
  onButtonClick,
  disabled = false,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
  onButtonClick?: () => void;
  disabled?: boolean;
}) => (
  <div className="animate_top group relative rounded-lg border border-stroke bg-white p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none md:w-[45%] lg:w-1/3 xl:p-12.5">
    {highlight && (
      <div className="text-metatitle absolute -right-3.5 top-7.5 -rotate-90 rounded-bl-full rounded-tl-full bg-primary px-4.5 py-1.5 font-medium uppercase text-white">
        popular
      </div>
    )}

    <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
      {price}
      {/*  <span className="text-regular text-waterloo dark:text-manatee">
        {" "}
        /mês
      </span> */}
    </h3>
    <h4 className="mb-2.5 text-para2 font-medium text-black dark:text-white">
      {title}
    </h4>
    <p>{description}</p>

    <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
      <ul>
        {features.map((item, index) => (
          <li
            key={index}
            className="mb-4 text-black last:mb-0 dark:text-manatee"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>

    <button
      onClick={onButtonClick}
      disabled={disabled}
      className={`group/btn inline-flex items-center gap-2.5 font-medium text-primary transition-all duration-300 dark:text-white dark:hover:text-primary ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
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

const AddOns = ({ isAnnual }: { isAnnual: boolean }) => {
  const addons = [
    {
      title: "WhatsApp Business",
      monthlyPrice: "+ 6.000 Kz/mês",
      annualPrice: "+ 72.000 Kz/ano",
      desc: "Atenda clientes via WhatsApp diretamente pelo painel do sistema. Inclui notificações e histórico integrado.",
    },
    {
      title: "Chat em tempo real",
      monthlyPrice: "+ 4.000 Kz/mês",
      annualPrice: "+ 48.000 Kz/ano",
      desc: "Widget de chat ao vivo no seu site. Converse com visitantes em tempo real e converta em tickets automaticamente.",
    },
    {
      title: "Domínio personalizado",
      monthlyPrice: "+ 3.500 Kz/mês",
      annualPrice: "+ 42.000 Kz/ano",
      desc: "Use o sistema com um domínio próprio (ex: suporte.suaempresa.co.ao) com sua identidade visual.",
    },
    {
      title: "Integração com ERP local",
      monthlyPrice: "Sob consulta",
      annualPrice: "Sob consulta",
      desc: "Conecte o sistema ao seu ERP (Primavera, Sage, PHC...) para automatizar faturação e dados dos clientes.",
    },
  ];

  return (
    <div className="mx-auto mt-20 max-w-[1207px] px-4 md:px-8 xl:px-0">
      <div className="animate_top mx-auto text-center">
        <SectionHeader
          headerInfo={{
            title: `Recursos Extras`,
            subtitle: `Funcionalidades adicionais sob demanda`,
            description: `Melhore ainda mais sua experiência com integrações e recursos profissionais.`,
          }}
        />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {addons.map((addon, index) => (
          <div
            key={index}
            className="rounded-2xl border border-stroke bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:border-strokedark dark:bg-blacksection"
          >
            <h4 className="mb-1 text-lg font-semibold text-black dark:text-white">
              {addon.title}
            </h4>
            <p className="mb-3 text-sm font-medium text-primary">
              {isAnnual ? addon.annualPrice : addon.monthlyPrice}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {addon.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
