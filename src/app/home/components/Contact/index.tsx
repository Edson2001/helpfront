"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const Contact = () => {
 
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {/* <!-- ===== Contact Start ===== --> */}
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="max-w-c-1390 px-7.5 lg:px-15 lg:pt-15 relative mx-auto pt-10 xl:px-20 xl:pt-20">
          <div className="-z-1 bg-linear-to-t dark:bg-linear-to-t absolute left-0 top-0 h-2/3 w-full rounded-lg from-transparent to-[#dee7ff47] dark:to-[#252A42]"></div>
          <div className="-z-1 absolute bottom-[-255px] left-0 h-full w-full">
            <Image
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="./images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
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
              className="animate_top p-7.5 shadow-solid-8 dark:border-strokedark xl:p-15 w-full rounded-lg bg-white dark:border dark:bg-black md:w-3/5 lg:w-3/4"
            >
              <h2 className="mb-15 xl:text-sectiontitle2 text-3xl font-semibold text-black dark:text-white">
                Envie uma mensagem
              </h2>

              <form
                action="https://formbold.com/s/unique_form_id"
                method="POST"
              >
                <div className="mb-7.5 gap-7.5 flex flex-col lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    placeholder="Nome completo"
                    className="border-stroke focus:border-waterloo focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee w-full border-b bg-transparent pb-3.5 focus:placeholder:text-black dark:focus:placeholder:text-white lg:w-1/2"
                  />

                  <input
                    type="email"
                    placeholder="Endereço de e-mail"
                    className="border-stroke focus:border-waterloo focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee w-full border-b bg-transparent pb-3.5 focus:placeholder:text-black dark:focus:placeholder:text-white lg:w-1/2"
                  />
                </div>

                <div className="mb-12.5 gap-7.5 flex flex-col lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    placeholder="Assunto"
                    className="border-stroke focus:border-waterloo focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee w-full border-b bg-transparent pb-3.5 focus:placeholder:text-black dark:focus:placeholder:text-white lg:w-1/2"
                  />

                  <input
                    type="text"
                    placeholder="Número de telefone"
                    className="border-stroke focus:border-waterloo focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee w-full border-b bg-transparent pb-3.5 focus:placeholder:text-black dark:focus:placeholder:text-white lg:w-1/2"
                  />
                </div>

                <div className="mb-11.5 flex">
                  <textarea
                    placeholder="Mensagem"
                    rows={4}
                    className="border-stroke focus:border-waterloo focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee w-full border-b bg-transparent focus:placeholder:text-black dark:focus:placeholder:text-white"
                  ></textarea>
                </div>

                <div className="flex flex-wrap gap-4 xl:justify-between">
                  <div className="mb-4 flex md:mb-0">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="peer sr-only"
                    />
                    <span className="group mt-2 flex h-5 min-w-[20px] items-center justify-center rounded-sm border-gray-300 bg-gray-100 text-blue-600 peer-checked:bg-primary dark:border-gray-600 dark:bg-gray-700">
                      <svg
                        className="in-[.group]:peer-checked:opacity-100 opacity-0"
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.70704 0.792787C9.89451 0.980314 9.99983 1.23462 9.99983 1.49979C9.99983 1.76495 9.89451 2.01926 9.70704 2.20679L4.70704 7.20679C4.51951 7.39426 4.26521 7.49957 4.00004 7.49957C3.73488 7.49957 3.48057 7.39426 3.29304 7.20679L0.293041 4.20679C0.110883 4.01818 0.0100885 3.76558 0.0123669 3.50339C0.0146453 3.24119 0.119814 2.99038 0.305222 2.80497C0.490631 2.61956 0.741443 2.51439 1.00364 2.51211C1.26584 2.50983 1.51844 2.61063 1.70704 2.79279L4.00004 5.08579L8.29304 0.792787C8.48057 0.605316 8.73488 0.5 9.00004 0.5C9.26521 0.5 9.51951 0.605316 9.70704 0.792787Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <label
                      htmlFor="default-checkbox"
                      className="flex max-w-[425px] cursor-pointer select-none pl-5"
                    >
                      Ao marcar esta caixa, você concorda com os nossos "Termos
                      de Uso" e o uso de cookies no navegador.
                    </label>
                  </div>

                  <button
                    aria-label="send message"
                    className="hover:bg-blackho dark:bg-btndark inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out"
                  >
                    Enviar Mensagem
                    <svg
                      className="fill-white"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </form>
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
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top md:p-7.5 xl:pt-15 w-full md:w-2/5 lg:w-[26%]"
            >
              <h2 className="mb-12.5 xl:text-sectiontitle2 text-3xl font-semibold text-black dark:text-white">
                Encontre-nos
              </h2>

              <div className="5 mb-7">
                <h3 className="text-metatitle3 mb-4 font-medium text-black dark:text-white">
                  Localização
                </h3>
                <p>Luanda, Maianga</p>
              </div>
              <div className="5 mb-7">
                <h3 className="text-metatitle3 mb-4 font-medium text-black dark:text-white">
                  E-mail
                </h3>
                <p>
                  <a href="mailto:geral@redeveloper.ao">geral@redeveloper.ao</a>
                </p>
              </div>
              <div>
                <h4 className="text-metatitle3 mb-4 font-medium text-black dark:text-white">
                  Telefone
                </h4>
                <p>
                  <a href="tel:+244925423743">+244 925 423 743</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Contact End ===== --> */}
    </>
  );
};

export default Contact;
