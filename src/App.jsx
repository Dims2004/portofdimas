import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import BubbleTransition from "./components/BubbleTransition";
import Home from "./pages/Home";
import Works from "./pages/Works";
import WorkDetail from "./pages/WorkDetail";
import Story from "./pages/Story";
import NotFound from "./pages/NotFound";

function PageTransition({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div id="top" className="min-h-screen bg-bg text-ink">
      <CustomCursor />
      <BubbleTransition />
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/karya" element={<Works />} />
            <Route path="/karya/:slug" element={<WorkDetail />} />
            <Route path="/cerita" element={<Story />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </div>
  );
}