"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const pathUrl = usePathname();

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  return (
    <header
      className={`fixed left-0 top-0 z-[999999] w-full py-7 ${
        stickyMenu
          ? "py-4! bg-white shadow-sm transition duration-100 dark:bg-black"
          : ""
      }`}
    >
      <div className="max-w-c-1390 relative mx-auto items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
        <div className="flex w-full items-center justify-between xl:w-1/4">
          <h2 className="font-bold">
            <Link href="/">
              {/* <Image
              src="/images/logo/logo-dark.svg"
              alt="logo"
              width={119.03}
              height={30}
              className="hidden w-full dark:block"
            />
            <Image
              src="/images/logo/logo-light.svg"
              alt="logo"
              width={119.03}
              height={30}
              className="w-full dark:hidden"
            /> */}
              RedHelp
            </Link>
          </h2>

          {/* Botão do Menu Mobile */}
          <button
            aria-label="hamburger Toggler"
            className="z-50 block rounded-md bg-gray-200 p-2 xl:hidden" // Estilo temporário para debug
            onClick={() => {
              console.log("Toggle menu:", !navigationOpen);
              setNavigationOpen(!navigationOpen);
            }}
          >
            <span className="relative block h-6 w-6 cursor-pointer">
              <span
                className={`absolute right-0 block h-0.5 w-full rounded-sm bg-black transition-all duration-300 ease-in-out dark:bg-white ${
                  navigationOpen ? "top-2 rotate-45" : "top-0"
                }`}
              ></span>
              <span
                className={`absolute right-0 block h-0.5 w-full rounded-sm bg-black transition-all duration-300 ease-in-out dark:bg-white ${
                  navigationOpen ? "opacity-0" : "top-2"
                }`}
              ></span>
              <span
                className={`absolute right-0 block h-0.5 w-full rounded-sm bg-black transition-all duration-300 ease-in-out dark:bg-white ${
                  navigationOpen ? "top-2 -rotate-45" : "top-4"
                }`}
              ></span>
            </span>
          </button>
        </div>

        {/* Menu de Navegação */}
        <div
          className={`${navigationOpen ? "visible h-auto bg-white" : "invisible h-0"} w-full items-center justify-between transition-all duration-300 xl:visible xl:flex xl:h-auto xl:w-full`}
          style={{
            backgroundColor: navigationOpen ? "white" : "transparent",
          }}
        >
          <nav>
            <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-10">
              {menuData.map((menuItem, key) => (
                <li key={key} className={menuItem.submenu && "group relative"}>
                  <Link
                    href={`${menuItem.path}`}
                    className={
                      pathUrl === menuItem.path
                        ? "text-primary hover:text-primary"
                        : "hover:text-primary"
                    }
                  >
                    {menuItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Botões de Ação */}
          <div className="mt-7 flex items-center gap-6 xl:mt-0">
            <ThemeToggler />
            <Link
              href="/login"
              className="text-regular text-waterloo font-medium hover:text-primary"
            >
              Entrar
            </Link>
            <Link
              href="/account"
              className="px-7.5 text-regular hover:bg-primaryho flex items-center justify-center rounded-full bg-primary py-2.5 text-white duration-300 ease-in-out"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
