"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const CTA = () => {
  return (
    <>
      {/* <!-- ===== CTA Start ===== --> */}
      <section className="lg:py-25 xl:py-30 overflow-hidden px-4 py-20 md:px-8 2xl:px-0">
        <div className="max-w-c-1390 bg-linear-to-t px-7.5 py-12.5 dark:bg-blacksection dark:bg-linear-to-t dark:stroke-strokedark md:px-12.5 xl:px-17.5 mx-auto rounded-lg from-[#F8F9FF] to-[#DEE7FF] dark:from-transparent dark:to-transparent xl:py-0">
          <div className="flex flex-wrap gap-8 md:flex-nowrap md:items-center md:justify-between md:gap-0">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-[70%] lg:w-1/2"
            >
              <h2 className="xl:text-sectiontitle4 mb-4 w-11/12 text-3xl font-bold text-black dark:text-white">
                Junte-se a Nós e Transforme seu Atendimento
              </h2>
              <p>
                Experimente nossa plataforma de helpdesk gratuitamente e
                descubra como podemos ajudar sua equipe a resolver chamados com
                mais eficiência e satisfação.
              </p>
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
              className="animate_right lg:w-[45%]"
            >
              <div className="flex items-center justify-end xl:justify-between">
                <Image
                  width={299}
                  height={299}
                  src="/images/shape/shape-06.png"
                  alt="Saly"
                  className="hidden xl:block"
                />
                <a
                  href="/auth/signup"
                  className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
                >
                  Comece Agora Gratuitamente
                  <Image
                    width={20}
                    height={20}
                    src="/images/icon/icon-arrow-dark.svg"
                    alt="Arrow"
                    className="dark:hidden"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/icon/icon-arrow-light.svg"
                    alt="Arrow"
                    className="hidden dark:block"
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== CTA End ===== --> */}
    </>
  );
};

export default CTA;
