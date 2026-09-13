import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const toneGradients = {
  1: "from-[#4B4238] to-[#C9A24B]",
  2: "from-[#31353A] to-[#7C8B79]",
  3: "from-[#2E2733] to-[#8C6E9C]",
  4: "from-[#3A2E28] to-[#B7754A]",
  5: "from-[#242B2C] to-[#5C8B8A]",
  6: "from-[#332A2A] to-[#A65C4E]",
};

export default function WorkCard({ work, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 25,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link
      to={`/karya/${work.slug}`}
      className={`group block ${className}`}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="overflow-hidden rounded-2xl border border-border bg-surface"
      >
        <div
          className={`aspect-[4/3] w-full overflow-hidden ${work.cover ? "" : `bg-gradient-to-br ${toneGradients[work.tone]}`} transition-transform duration-500 group-hover:scale-[1.05]`}
        >
          {work.cover && (
            <img src={work.cover} alt={work.title} className="h-full w-full object-cover" />
          )}
        </div>
        <div className="flex flex-col gap-2 p-6">
          <h3 className="font-serif text-lg text-ink">{work.title}</h3>
          <p className="text-sm text-accent-2">{work.tags.join(" · ")}</p>
          <p className="text-sm text-muted">{work.summary}</p>
        </div>
      </motion.div>
    </Link>
  );
}