import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
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

// Pindah halaman → mulai dari atas (kecuali sedang diminta scroll ke section tertentu)
function ScrollManager() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (state?.scrollTo) return;
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div id="top" className="app-bg min-h-screen text-ink">
      <ScrollManager />
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/karya/:slug" element={<WorkDetail />} />
            {/* alamat lama → diarahkan ke beranda */}
            <Route path="/karya" element={<Navigate to="/" replace />} />
            <Route path="/cerita" element={<Navigate to="/" replace />} />
            <Route path="/sertifikasi" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
