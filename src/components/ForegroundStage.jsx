import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useScene } from "../lib/sceneStore";
import { camFor } from "../lib/routes";
import { Bamboo, Candi, Gunungan } from "./Ornaments";

// Lapisan latar depan (siluet) yang masuk bergantian untuk tiap halaman,
// seperti "foreground cut-out" di halaman referensi. Selalu menempel di dasar layar.
const STAGES = [
  [{ k: "bamboo", cls: "left-[-2%] w-[9vw]" }, { k: "bamboo", flip: true, cls: "right-[-2%] w-[8vw]" }],
  [{ k: "gunungan", cls: "left-[1%] w-[9vw] opacity-60" }, { k: "bamboo", flip: true, cls: "right-[-2%] w-[9vw]" }],
  [{ k: "bamboo", cls: "left-[-3%] w-[8vw]" }, { k: "gunungan", cls: "right-[2%] w-[8vw] opacity-50" }],
  [{ k: "bamboo", cls: "left-[-2%] w-[8vw]" }, { k: "bamboo", flip: true, cls: "right-[-3%] w-[9vw]" }],
  [{ k: "gunungan", cls: "right-[2%] w-[9vw] opacity-60" }, { k: "bamboo", cls: "left-[-2%] w-[9vw]" }],
  [{ k: "bamboo", cls: "left-[-3%] w-[9vw]" }, { k: "bamboo", flip: true, cls: "right-[-3%] w-[8vw]" }],
  [{ k: "candi", cls: "left-1/2 w-[min(900px,90vw)] -translate-x-1/2 opacity-30" }],
];

function Piece({ k, flip }) {
  if (k === "candi") return <Candi className="h-auto w-full" />;
  if (k === "gunungan") return <Gunungan className="h-auto w-full" />;
  return <Bamboo className="h-auto w-full" flip={flip} />;
}

export default function ForegroundStage() {
  const ready = useScene((s) => s.ready);
  const { pathname } = useLocation();
  const idx = camFor(pathname);
  if (!ready) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-[5] hidden h-[60svh] opacity-60 md:block">
      <AnimatePresence mode="popLayout">
        <motion.div key={idx} className="absolute inset-0">
          {STAGES[idx]?.map((p, i) => (
            <motion.div
              key={i}
              className={`absolute bottom-[-4vh] ${p.cls}`}
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1.2, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, y: 40, transition: { duration: 0.7 } }}
            >
              <Piece k={p.k} flip={p.flip} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
