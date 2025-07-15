import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      zIndex: {
        "1": "1",
      },
      fontFamily: {
        sans: ["var(--font-gabarito)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans], // Adicione a fonte 'inter'
      },
      screens: {
        phone: "370px",
        tablet: "750px",
        laptop: "1000px",
        desktop: "1200px",
      },
      colors: {
        // ÚNICO bloco colors permitido
        border: "hsl(var(--color-stroke))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        waterloo: "hsl(var(--waterloo))",
        manatee: "hsl(var(--manatee))",
        "light-blue": "#F8F9FF",
        "light-blue-2": "#DEE7FF",
        blacksection: "#000000",
        strokedark: "#2D2D2D",
        blackho: "hsl(var(--blackho))",
        btndark: "hsl(var(--btndark))",
        titlebg: "hsl(var(--titlebg))",
        titlebgdark: "hsl(var(--titlebgdark))",
        alabaster: "hsl(var(--alabaster))",
        stroke: "hsl(var(--stroke))",
        //strokedark: "hsl(var(--strokedark))",
        black: "hsl(var(--black))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      spacing: {
        "7.5": "1.875rem", // 30px
        "12.5": "3.125rem", // 50px
        "22.5": "5.625rem", // 90px
        "27.5": "6.875rem", // 110px
        "25": "6.25rem", // Adiciona pb-25 (6.25rem = 100px / 16)
        "30": "7.5rem", // Adiciona pb-30 (7.5rem = 120px / 16)
        "35": "8.75rem", // pt-35 (8.75rem = 140px / 16)
        "40": "10rem", // pt-40 (10rem = 160px / 16)
        "46": "11.5rem", // xl:pt-46 (11.5rem = 184px / 16)
        "29": "7.25rem", // xl:gap-29 (7.25rem = 116px / 16)
        "15": "3.75rem", // 60px (não está explícito, mas pode ser inferido)
        "20": "5rem", // 80px
        /* "25": "6.25rem", // 100px (mantenha apenas esta linha)
        "30": "7.5rem", // 120px */
      },

      fontSize: {
        metatitle3: "1.25rem", // Defina o tamanho desejado para 'metatitle3'
        regular: "1rem",
        hero: "4rem",
        titlebg: "1.5rem",
        sectiontitle3: "1.875rem", // Exemplo: 30px
        para2: "1.125rem", // Exemplo: 18px
      },
      boxShadow: {
        "solid-5": "0 4px 10px rgba(0, 0, 0, 0.05)", // Exemplo de sombra personalizada
        "solid-6": "0 4px 12px rgba(0, 0, 0, 0.06)", // Exemplo de sombra personalizada
        "solid-13": "0 4px 20px rgba(0, 0, 0, 0.13)",
        "solid-8": "0 4px 16px rgba(0, 0, 0, 0.08)",
        "solid-l": "0 4px 20px rgba(0, 0, 0, 0.1)",
        "solid-7": "0 4px 14px rgba(0, 0, 0, 0.07)", // Adicionar esta linha
        "solid-10": "0 4px 18px rgba(0, 0, 0, 0.10)", // Exemplo
      },
      maxWidth: {
        "c-1390": "1390px",
        "c-1154": "1154px", // Adicionar esta linha
        "c-1235": "1235px", // Adiciona max-w-c-1235
        "c-1315": "1315px", // Adicione esta linha se não existir
      },
      backgroundImage: {
        "linear-to-t":
          "linear-gradient(to top, var(--tw-gradient-from), var(--tw-gradient-to))",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
