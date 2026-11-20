import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import About from "../components/About";
import Stats from "../components/Stats";
import Resume from "../components/Resume";
import Portfolio from "../components/Portfolio";
import Services from "../components/Services";
import Certificates from "../components/Certificates";
import Contact from "../components/Contact";
import { scrollToId } from "../components/Header";

export default function Home() {
  const { state } = useLocation();
  const target = state?.scrollTo;

  // Datang dari halaman detail -> langsung ke section yang dipilih
  useEffect(() => {
    if (!target) return;
    const timer = setTimeout(() => scrollToId(target), 80);
    return () => clearTimeout(timer);
  }, [target]);

  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Resume />
      <Portfolio />
      <Services />
      <Certificates />
      <Contact />
    </>
  );
}
