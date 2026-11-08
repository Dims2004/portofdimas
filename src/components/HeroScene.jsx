import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Bamboo, Candi } from "./Ornaments";

// ============================================================
// Panggung hero berlapis (parallax saat scroll):
// langit malam → matahari soga + cincin HUD → punggung gunung →
// candi neon → kabut → rumpun bambu → lantai grid.
// ============================================================
function Ridge({ className = "", opacity = 1 }) {
  return (
    <svg
      viewBox="0 0 1440 260"
      preserveAspectRatio="none"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <path
        d="M0 260V150C90 120 150 70 250 96C330 118 380 60 470 52C560 46 610 110 700 120C800 132 850 70 950 62C1050 56 1110 110 1200 112C1290 114 1360 80 1440 62V260Z"
        fill="#060919"
        stroke="#22e5ff"
        strokeOpacity=".35"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function HeroScene({ targetRef }) {
  const fallback = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef ?? fallback,
    offset: ["start start", "end start"],
  });

  const useRange = (a) => useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, a]);
  const ySun = useRange(120);
  const yRidgeFar = useRange(70);
  const yCandi = useRange(40);
  const yRidgeNear = useRange(20);
  const yBambooL = useRange(-60);
  const yBambooR = useRange(-90);
  const fade = useTransform(scrollYProgress, [0.55, 1], [1, 0]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* langit */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,5,12,0) 0%, rgba(10,13,43,.55) 40%, rgba(60,14,34,.55) 78%, rgba(120,24,40,.45) 100%)",
        }}
      />

      {/* matahari soga + cincin HUD */}
      <motion.div
        style={{ y: ySun, opacity: fade }}
        className="absolute right-[-8%] top-[8%] h-[520px] w-[520px] sm:right-[6%] sm:h-[640px] sm:w-[640px]"
      >
        <div
          className="absolute inset-[14%] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, #ff6a5a 0%, #ff3b4e 38%, rgba(255,59,78,.25) 62%, transparent 72%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute inset-[22%] rounded-full opacity-30"
          style={{ backgroundImage: "var(--kawung)", backgroundSize: "40px 40px" }}
        />
        <div className="animate-spin-slow absolute inset-[4%] rounded-full border border-dashed border-accent/40" />
        <div className="animate-spin-rev absolute inset-[10%] rounded-full border border-accent-2/30" />
        <div className="absolute inset-0 rounded-full border border-accent/15" />
      </motion.div>

      {/* punggung gunung jauh */}
      <motion.div style={{ y: yRidgeFar }} className="absolute inset-x-0 bottom-[16%] h-[34%]">
        <Ridge className="h-full w-full" opacity={0.75} />
      </motion.div>

      {/* candi */}
      <motion.div
        style={{ y: yCandi }}
        className="absolute inset-x-0 bottom-[8%] mx-auto flex w-[min(1100px,130vw)] justify-center sm:bottom-[10%]"
      >
        <Candi className="w-full drop-shadow-[0_0_40px_rgba(34,229,255,0.25)]" />
      </motion.div>

      {/* punggung gunung dekat */}
      <motion.div style={{ y: yRidgeNear }} className="absolute inset-x-0 bottom-0 h-[24%]">
        <Ridge className="h-full w-full" />
      </motion.div>

      {/* lantai grid */}
      <div className="absolute inset-x-0 bottom-0 h-[22%] overflow-hidden">
        <div className="cyber-floor h-[200%] w-full opacity-40" />
      </div>

      {/* bambu latar depan */}
      <motion.div
        style={{ y: yBambooL }}
        className="absolute bottom-0 left-[-3%] h-[78%] w-[22%] min-w-[120px] max-w-[260px]"
      >
        <div className="animate-sway h-full w-full">
          <Bamboo className="h-full w-full" />
        </div>
      </motion.div>
      <motion.div
        style={{ y: yBambooR }}
        className="absolute bottom-0 right-[-3%] hidden h-[66%] w-[18%] max-w-[220px] sm:block"
      >
        <div className="animate-sway h-full w-full" style={{ animationDelay: "-3s" }}>
          <Bamboo className="h-full w-full" flip />
        </div>
      </motion.div>

      {/* transisi ke bab berikutnya */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
