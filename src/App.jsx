import { Component, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import Preloader from "./components/Preloader";
import Home from "./pages/Home";
import WorkDetail from "./pages/WorkDetail";
import NotFound from "./pages/NotFound";

// Satu halaman rusak tidak boleh mematikan seluruh situs
class Guard extends Component {
  state = { err: null };
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(err) { console.error("[halaman]", err); }
  render() {
    if (!this.state.err) return this.props.children;
    return (
      <section className="section">
        <div className="container text-center">
          <p>Halaman gagal dimuat. / This page failed to load.</p>
          <button type="button" className="btn-site" onClick={() => location.reload()}>Muat ulang</button>
        </div>
      </section>
    );
  }
}

export default function App() {
  const { pathname, state } = useLocation();

  // Pindah ke halaman detail -> mulai dari atas
  useEffect(() => {
    if (pathname !== "/" || !state?.scrollTo) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, state]);

  return (
    <>
      <Preloader />
      <Header />
      <main className="main">
        <Guard key={pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/karya/:slug" element={<WorkDetail />} />
            {/* alamat lama -> halaman baru */}
            {["/tentang", "/cerita", "/pengalaman", "/organisasi", "/proyek", "/karya", "/sertifikat", "/sertifikasi", "/kontak"].map((p) => (
              <Route key={p} path={p} element={<Navigate to="/" replace />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Guard>
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
