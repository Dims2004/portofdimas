import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Experience from "../sections/Experience";
import Organization from "../sections/Organization";
import Projects from "../sections/Projects";
import Certificates from "../sections/Certificates";
import Divider from "../components/Divider";
import { scrollToSection } from "../lib/scrollTo";

export default function Home() {
  const { state } = useLocation();

  // Dipakai saat user klik menu dari halaman lain (mis. detail proyek) → balik ke beranda lalu scroll
  useEffect(() => {
    const id = state?.scrollTo;
    if (!id) return;
    const timer = setTimeout(() => {
      if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else scrollToSection(id);
    }, 450);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <>
      <Hero />
      <About />
      <Divider />
      <Experience />
      <Divider />
      <Organization />
      <Divider />
      <Projects />
      <Divider />
      <Certificates />
      <Divider />
    </>
  );
}
