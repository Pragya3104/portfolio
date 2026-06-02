"use client";
import { useState } from "react";
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

export default function Home() {
  const [siteReady, setSiteReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setSiteReady(true)} />
      <Grain />
      <Cursor />
      <Navbar />
      <main>
        <Hero ready={siteReady} />
        <Marquee />
        <About />
        <Work />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
