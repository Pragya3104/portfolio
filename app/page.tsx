"use client";
import { useState, useEffect } from "react";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Grain from "@/components/Grain";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollDots from "@/components/ScrollDots";
import Terminal from "@/components/Terminal";
import Experience from "@/components/Experience";

export default function Home() {
  const [siteReady, setSiteReady] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Backtick opens terminal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`") setTerminalOpen(o => !o);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Preloader onComplete={() => setSiteReady(true)} />
      <SmoothScroll />
      <ScrollProgress />
      <Grain />
      <Cursor />
      <ScrollDots />
      {terminalOpen && <Terminal onClose={() => setTerminalOpen(false)} />}
      <Navbar onTerminalOpen={() => setTerminalOpen(true)} />
      <main>
        <Hero ready={siteReady} onTerminalOpen={() => setTerminalOpen(true)} />
        <Marquee />
        <About />
        <Experience />
        <Work />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
