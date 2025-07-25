"use client";

import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Lines from "./components/Lines";
import ScrollToTop from "./components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={`dark:bg-black ${inter.className} site`}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <Lines />
          <Header />
          {/* <ToasterContext /> */}
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </div>
    </>
  );
}
