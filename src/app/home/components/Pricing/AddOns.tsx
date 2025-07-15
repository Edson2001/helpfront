"use client";

import SectionHeader from "../Common/SectionHeader";

const AddOns = () => {
  const addons = [
    {
      title: "WhatsApp Business",
      price: "+ 6.000 Kz/mês",
      desc: "Atenda clientes via WhatsApp diretamente pelo painel do sistema. Inclui notificações e histórico integrado."
    },
    {
      title: "Chat em tempo real",
      price: "+ 4.000 Kz/mês",
      desc: "Widget de chat ao vivo no seu site. Converse com visitantes em tempo real e converta em tickets automaticamente."
    },
    {
      title: "Domínio personalizado",
      price: "+ 3.500 Kz/mês",
      desc: "Use o sistema com um domínio próprio (ex: suporte.suaempresa.co.ao) com sua identidade visual."
    },
    {
      title: "Integração com ERP local",
      price: "Sob consulta",
      desc: "Conecte o sistema ao seu ERP (Primavera, Sage, PHC...) para automatizar faturação e dados dos clientes."
    }
  ];

  return (
    <div className="mt-20 max-w-[1207px] mx-auto px-4 md:px-8 xl:px-0">
      <div className="animate_top mx-auto text-center">
        <SectionHeader
          headerInfo={{
            title: `Recursos Extras (Add-ons)`,
            subtitle: `Funcionalidades adicionais sob demanda`,
            description: `Melhore ainda mais sua experiência com integrações e recursos profissionais.`
          }}
        />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {addons.map((addon, index) => (
          <div
            key={index}
            className="p-6 border border-stroke dark:border-strokedark rounded-2xl bg-white dark:bg-blacksection shadow-md hover:shadow-lg transition-shadow"
          >
            <h4 className="text-lg font-semibold text-black dark:text-white mb-1">
              {addon.title}
            </h4>
            <p className="text-sm text-primary font-medium mb-3">{addon.price}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{addon.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddOns;
