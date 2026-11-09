import { Component } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import CyberBackdrop from "./components/CyberBackdrop";
import WorldCanvas from "./components/WorldCanvas";
import Preloader from "./components/Preloader";
import ForegroundStage from "./components/ForegroundStage";
import Overlays from "./components/Overlays";
import Footer from "./components/Footer";
import { useScene } from "./lib/sceneStore";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Organization from "./pages/Organization";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";
import WorkDetail from "./pages/WorkDetail";
import NotFound from "./pages/NotFound";

function PageTransition({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

// Satu halaman rusak tidak boleh mematikan seluruh situs
class Guard extends Component {
  state = { err: null };
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(err) { console.error("[halaman]", err); }
  render() {
    if (!this.state.err) return this.props.children;
    return (
      <section className="pg flex flex-col justify-center">
        <p className="eyebrow mb-4">Error</p>
        <p className="body-lg mb-6">Halaman gagal dimuat. / This page failed to load.</p>
        <div><a className="btn-primary" href="#/" onClick={() => location.reload()}>Muat ulang</a></div>
      </section>
    );
  }
}

export default function App() {
  const location = useLocation();
  const webgl = useScene((s) => s.webgl);

  return (
    <div id="top" className="app-root">
      <WorldCanvas />
      {!webgl && <CyberBackdrop />}
      <Preloader />
      <Overlays />
      <ForegroundStage />
      <Navbar />
      <div className="page">
        {/* pindah halaman → mulai dari atas setelah halaman lama selesai memudar */}
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}>
          <PageTransition key={location.pathname}>
            <Guard key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/tentang" element={<About />} />
                <Route path="/pengalaman" element={<Experience />} />
                <Route path="/organisasi" element={<Organization />} />
                <Route path="/proyek" element={<Projects />} />
                <Route path="/sertifikat" element={<Certificates />} />
                <Route path="/kontak" element={<Contact />} />
                <Route path="/karya/:slug" element={<WorkDetail />} />
                {/* alamat lama → halaman baru */}
                <Route path="/karya" element={<Navigate to="/proyek" replace />} />
                <Route path="/cerita" element={<Navigate to="/tentang" replace />} />
                <Route path="/sertifikasi" element={<Navigate to="/sertifikat" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Guard>
          </PageTransition>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}