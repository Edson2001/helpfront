"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const FunFact = () => {
  return (
    <>
      {/* <!-- ===== Funfact Start ===== --> */}
      <section className="lg:py-22.5 px-4 py-20 md:px-8 2xl:px-0">
        <div className="z-1 max-w-c-1390 bg-linear-to-t py-22.5 dark:bg-blacksection dark:bg-linear-to-t dark:stroke-strokedark xl:py-27.5 relative mx-auto rounded-lg from-[#F8F9FF] to-[#DEE7FF] dark:from-transparent dark:to-transparent">
          <Image
            width={335}
            height={384}
            src="/images/shape/shape-04.png"
            alt="Man"
            className="-left-15 -top-25 -z-1 absolute lg:left-0"
          />
          <Image
            width={132}
            height={132}
            src="/images/shape/shape-05.png"
            alt="Doodle"
            className="-z-1 absolute bottom-0 right-0"
          />

          <Image
            fill
            src="/images/shape/shape-dotted-light-02.svg"
            alt="Dotted"
            className="-z-1 absolute left-0 top-0 dark:hidden"
          />
          <Image
            fill
            src="/images/shape/shape-dotted-dark-02.svg"
            alt="Dotted"
            className="-z-1 absolute left-0 top-0 hidden dark:block"
          />

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top mb-12.5 lg:mb-17.5 mx-auto px-4 text-center md:w-4/5 md:px-0 lg:w-2/3 xl:w-1/2"
          >
            <h2 className="xl:text-sectiontitle3 mb-4 text-3xl font-bold text-black dark:text-white">
              Confiado por Empresas Globais
            </h2>
            <p className="mx-auto lg:w-11/12">
              Nossa plataforma de helpdesk já ajudou milhares de empresas a
              otimizar o atendimento ao cliente, reduzir tempos de resposta e
              aumentar a satisfação.
            </p>
          </motion.div>

          <div className="lg:gap-42.5 flex flex-wrap justify-center gap-8">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="xl:text-sectiontitle3 mb-2.5 text-3xl font-bold text-black dark:text-white">
                10K+
              </h3>
              <p className="lg:text-para2 text-lg">Chamados Resolvidos</p>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="xl:text-sectiontitle3 mb-2.5 text-3xl font-bold text-black dark:text-white">
                95%
              </h3>
              <p className="lg:text-para2 text-lg">Satisfação do Cliente</p>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="xl:text-sectiontitle3 mb-2.5 text-3xl font-bold text-black dark:text-white">
                24/7
              </h3>
              <p className="lg:text-para2 text-lg">Suporte Disponível</p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Funfact End ===== --> */}
    </>
  );
};

export default FunFact;
