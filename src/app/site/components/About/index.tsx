"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <>
      {/* <!-- ===== About Start ===== --> */}
      <section className="lg:pb-25 xl:pb-30 overflow-hidden pb-20">
        <div className="max-w-c-1235 mx-auto px-4 md:px-8 xl:px-0">
          <div className="lg:gap-32.5 flex items-center gap-8">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
              <Image
                src="/images/about/about-light-01.png"
                alt="About"
                className="dark:hidden"
                fill
              />
              <Image
                src="/images/about/about-dark-01.png"
                alt="About"
                className="hidden dark:block"
                fill
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              <span className="font-medium uppercase text-black dark:text-white">
                <span className="bg-meta px-4.5 text-metatitle mb-4 mr-4 inline-flex rounded-full py-1 uppercase text-white">
                  Novo
                </span>{" "}
                Plataforma de Helpdesk
              </span>
              <h2 className="xl:text-hero flex flex-col relative mb-6 text-3xl font-bold text-black dark:text-white">
                <div className="flex mb-6">Uma Solução</div>
                <div className="flex mb-6">Completa para</div>
                <span className="before:-z-1 mb-6 before:bg-titlebg dark:before:bg-titlebgdark relative mt-3 inline-block flex before:absolute before:bottom-2.5 before:left-0 before:h-3 before:w-full">
                  Atendimento ao 
                </span>
                <span>Cliente</span>
              </h2>
              <p>
                Nossa plataforma foi desenvolvida para simplificar e otimizar o
                atendimento ao cliente, oferecendo ferramentas poderosas para
                gerenciar chamados, métricas e colaboração em equipe.
              </p>

              <div className="mt-7.5 flex items-center gap-5">
                <div className="h-15 w-15 border-stroke dark:border-strokedark dark:bg-blacksection flex items-center justify-center rounded-[50%] border">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    01
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="text-metatitle2 mb-0.5 text-black dark:text-white">
                    Centralização de Chamados
                  </h3>
                  <p>
                    Gerencie todos os tickets em um único lugar, com histórico
                    completo e acompanhamento em tempo real.
                  </p>
                </div>
              </div>
              <div className="mt-7.5 flex items-center gap-5">
                <div className="h-15 w-15 border-stroke dark:border-strokedark dark:bg-blacksection flex items-center justify-center rounded-[50%] border">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    02
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="text-metatitle2 mb-0.5 text-black dark:text-white">
                    Relatórios Detalhados
                  </h3>
                  <p>
                    Acesse métricas de desempenho e satisfação do cliente para
                    tomar decisões baseadas em dados.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== About End ===== --> */}

      {/* <!-- ===== About Two Start ===== --> */}
      <section>
        <div className="max-w-c-1235 mx-auto overflow-hidden px-4 md:px-8 2xl:px-0">
          <div className="lg:gap-32.5 flex items-center gap-8">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2"
            >
              <h4 className="font-medium mb-3 uppercase text-black dark:text-white">
                Integrações Poderosas
              </h4>
              <h2 className="xl:text-hero relative mb-6 text-3xl font-bold text-black dark:text-white">
                <span className="mb-6 flex">Conecte-se com</span> {"   "}
                <span className="before:-z-1 before:bg-titlebg2 dark:before:bg-titlebgdark relative inline-block before:absolute before:bottom-2.5 before:left-0 before:h-3 before:w-full">
                  Seus Canais
                </span>
              </h2>
              <p>
                Nossa plataforma suporta integração com e-mail, chat, redes
                sociais e outros canais de comunicação, centralizando tudo em um
                único painel.
              </p>
              <div>
                <a
                  href="#"
                  className="mt-7.5 group inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover:pr-2">
                    Saiba Mais
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                  >
                    <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
              <Image
                src="./images/about/about-light-02.svg"
                alt="About"
                className="dark:hidden"
                fill
              />
              <Image
                src="./images/about/about-dark-02.svg"
                alt="About"
                className="hidden dark:block"
                fill
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== About Two End ===== --> */}
    </>
  );
};

export default About;
