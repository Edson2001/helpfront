"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";

const Integration = () => {
  return (
    <>
      <section>
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          {/* <!-- Section Title Start --> */}
          <SectionHeader
            headerInfo={{
              title: `INTEGRAÇÕES`,
              subtitle: `Conecte-se com os Canais que Sua Equipe Precisa.`,
              description: `Nossa plataforma suporta integração com e-mail, chat, redes sociais e outros canais de comunicação, centralizando tudo em um único painel para otimizar o atendimento.`,
            }}
          />

          {/* <!-- Section Title End --> */}
        </div>

        <div className="pattern-dots pattern-blue-500 pattern-bg-white pattern-size-4 pattern-opacity-10 mt-15 max-w-c-1154 relative z-50 mx-auto px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="-z-1 absolute -top-3/4 left-0 right-0 mx-auto h-full w-full">
            <Image
              width={1200}
              height={400}
              sizes="(max-width: 768px) 100vw"
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              style={{ position: "static" }}
            />
            <Image
              fill
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
            />
          </div>
          <div className="flex flex-wrap justify-around gap-y-10">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-1/6"
            >
              <div className="p-4.5 shadow-solid-7 dark:bg-btndark inline-block rounded-[10px] bg-white">
                <Image
                  width={50}
                  height={50}
                  src="/images/Telegram_2019_Logo.svg.png" // Substitua pelo caminho do ícone do Gmail, Slack, etc.
                  alt="Gmail"
                />
              </div>
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
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-1/6"
            ></motion.div>

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
              className="animate_top w-1/6"
            >
              <div className="p-4.5 shadow-solid-7 dark:bg-btndark inline-block rounded-[10px] bg-white">
                <Image
                  width={50}
                  height={50}
                  src="/images/ms-teams-meetings-integration.webp"
                  alt="Brand"
                />
              </div>
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
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-1/6"
            >
              <div className="h-[11px] w-[11px] rounded-full bg-[#FFDB26]"></div>
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
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-1/6"
            >
              <div className="h-[23px] w-[23px] rounded-full bg-[#EF5C00]"></div>
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
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-1/6"
            >
              <div className="p-4.5 shadow-solid-7 dark:bg-btndark inline-block rounded-[10px] bg-white">
                <Image
                  width={50}
                  height={50}
                  src="/images/images.png"
                  alt="Brand"
                />
              </div>
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
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-1/6"
            >
              <div className="h-[15px] w-[15px] rounded-full bg-[#016BFF]"></div>
            </motion.div>

            
             

            {/* Exemplo de integração com Slack */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="animate_top w-1/6"
            >
              <div className="p-4.5 shadow-solid-7 dark:bg-btndark inline-block rounded-[10px] bg-white">
                <Image
                  width={50}
                  height={50}
                  src="/images/Gmail_icon_(2020).svg (1).png" // Adicione o ícone do Slack
                  alt="Slack"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Integration;
