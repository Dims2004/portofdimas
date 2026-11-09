import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Judul besar huruf kapital yang muncul kata demi kata (masked word reveal),
// seperti heading di halaman referensi. Teks asli tetap jadi aria-label.
export default function Display({ lines, as = "h2", className = "", delay = 0, immediate = false }) {
  const Tag = motion[as] ?? motion.h2;
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = immediate || inView || reduce;
  const list = Array.isArray(lines) ? lines : [lines];
  let n = 0;
  return (
    <Tag ref={ref} className={`display ${className}`} aria-label={list.join(" ")}>
      {list.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {String(line)
            .split(" ")
            .map((w, wi, arr) => {
              const d = delay + n++ * 0.072;
              return (
                <span key={wi}>
                  <span className="word-mask">
                    <motion.span
                      className="word"
                      initial={{ y: "112%", opacity: 0 }}
                      animate={show ? { y: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.82, delay: d, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {w}
                    </motion.span>
                  </span>
                  {wi < arr.length - 1 ? " " : ""}
                </span>
              );
            })}
        </span>
      ))}
    </Tag>
  );
}
