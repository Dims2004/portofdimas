import { useEffect, useRef } from "react";

// Latar partikel jaringan (titik cyan + emas yang saling terhubung).
// Ringan: berhenti saat tab disembunyikan, statis bila "reduce motion".
export default function CyberBackdrop() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0,
      pts = [];
    const mouse = { x: -9999, y: -9999 };

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      const count = Math.min(64, Math.floor((window.innerWidth * window.innerHeight) / 24000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28 * dpr,
        vy: (Math.random() - 0.5) * 0.28 * dpr,
        r: (Math.random() * 1.3 + 0.5) * dpr,
        gold: Math.random() < 0.18,
      }));
    };

    const frame = (move) => {
      ctx.clearRect(0, 0, w, h);
      const link = 150 * dpr;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (move) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? "rgba(201,162,74,.85)" : "rgba(223,231,224,.75)";
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < link) {
            ctx.strokeStyle = `rgba(223,231,224,${(1 - d / link) * 0.16})`;
            ctx.lineWidth = dpr * 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 190 * dpr) {
          ctx.strokeStyle = `rgba(201,162,74,${(1 - dm / (190 * dpr)) * 0.4})`;
          ctx.lineWidth = dpr;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    };

    const loop = () => {
      frame(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce) frame(false);
      else loop();
    };

    const onMove = (e) => {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onResize = () => {
      init();
      start();
    };
    const onVis = () => (document.hidden ? cancelAnimationFrame(raf) : start());

    init();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[1] opacity-70"
    />
  );
}
