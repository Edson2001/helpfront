"use client";

import React from "react";
import SectionHeader from "../Common/SectionHeader";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Feature = () => {
  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
      <section id="features" className="lg:py-25 xl:py-30 py-20">
        <div className="max-w-c-1315 mx-auto px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <SectionHeader
            headerInfo={{
              title: "RECURSOS PRINCIPAIS", // Título já alterado
              subtitle: "Principais Funcionalidades do Sistema", // Novo subtítulo
              description:
                "Descubra como nossa plataforma pode otimizar o atendimento ao cliente e melhorar a produtividade da sua equipe.", // Nova descrição
            }}
          />
          {/* <!-- Section Title End --> */}

          <div className="mt-12.5 gap-7.5 lg:mt-15 xl:gap-12.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:mt-20">
            {/* <!-- Features item Start --> */}

            {featuresData.map((feature, key) => (
              <SingleFeature feature={feature} key={key} />
            ))}
            {/* <!-- Features item End --> */}
          </div>
        </div>
      </section>

      {/* <!-- ===== Features End ===== --> */}
    </>
  );
};

export default Feature;
