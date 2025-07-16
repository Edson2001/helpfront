import { Metadata } from "next";
import About from "./components/About";
import Blog from "./components/Blog";
import Brands from "./components/Brands";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Feature from "./components/Features";
import FeaturesTab from "./components/FeaturesTab";
import FunFact from "./components/FunFact";
import Hero from "./components/Hero";
import Integration from "./components/Integration";
import Pricing from "./components/Pricing";
import Testimonial from "./components/Testimonial";
import Script from "next/script";

export const metadata: Metadata = {
  title: "RedHelp - Solução Completa de Helpdesk | Gerenciamento de Chamados",
  description:
    "Gerencie seus chamados com facilidade. RedHelp é a plataforma inteligente para gerenciamento de suporte técnico, agilizando atendimentos e melhorando a satisfação dos clientes.",
  keywords: [
    "helpdesk",
    "suporte técnico",
    "gerenciamento de chamados",
    "RedHelp",
    "atendimento ao cliente",
    "solução de helpdesk",
  ],
  openGraph: {
    title: "RedHelp - Solução Completa de Helpdesk | Gerenciamento de Chamados",
    description:
      "Gerencie seus chamados com facilidade. RedHelp é a plataforma inteligente para gerenciamento de suporte técnico, agilizando atendimentos e melhorando a satisfação dos clientes.",
    url: "https://redhelp.com", // Substitua pela URL real do projeto
    siteName: "RedHelp",
    images: [
      {
        url: "/images/hero/hero-dark.svg", // Substitua pela imagem de destaque do projeto
        width: 1200,
        height: 630,
        alt: "RedHelp - Solução de Helpdesk",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RedHelp - Solução Completa de Helpdesk | Gerenciamento de Chamados",
    description:
      "Gerencie seus chamados com facilidade. RedHelp é a plataforma inteligente para gerenciamento de suporte técnico, agilizando atendimentos e melhorando a satisfação dos clientes.",
    images: ["/images/hero/hero-dark.svg"], // Substitua pela imagem de destaque do projeto
  },
  // other metadata
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <Feature />
      <About />
      <FeaturesTab />
      <FunFact />
      <Integration />
      <CTA />
      <FAQ />
      <Testimonial />
      <Pricing />
      <Contact />
      <Script src="http://localhost:3000/widget.js"  data-slug="geral"/>
    </main>
  );
}
