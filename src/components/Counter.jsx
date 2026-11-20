import { useEffect, useState } from "react";
import useInView from "../hooks/useInView";

// Angka yang menghitung naik dari 0 (pengganti PureCounter)
export default function Counter({ end = 0, decimals = 0, duration = 1200, className = "purecounter" }) {
  const [ref, seen] = useInView({ threshold: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!seen) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(end);
      return;
    }
    let raf;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(end * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, end, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("id-ID", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}
