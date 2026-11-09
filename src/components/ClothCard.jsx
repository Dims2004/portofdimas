import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { createCloth, clothPlate } from "../lib/cloth";
import { withBase } from "../lib/assetPath";
import { Aksara, jawaNumber } from "./Ornaments";

// Warna cadangan bila proyek belum punya gambar sampul
const FALLBACK = [
  ["#0c1d22", "#2a1210"], ["#10161e", "#1e0f14"], ["#0d1a18", "#241a0c"],
  ["#14121c", "#220e12"], ["#0b1a1d", "#122018"],
];

/**
 * Kartu proyek: sampul digambar di atas kain WebGL2 yang berayun tertiup angin
 * dan bergerak saat disentuh kursor. Tanpa WebGL2 → tampil sebagai gambar biasa.
 */
export default function ClothCard({ work, no, total, label, big = false, enableCloth = true }) {
  const frRef = useRef(null);
  const [onCloth, setOnCloth] = useState(false);

  useEffect(() => {
    const fr = frRef.current;
    if (!fr || !enableCloth || matchMedia("(hover: none)").matches) return;
    let inst = null;
    let out = null;
    let alive = true;
    const dpr = () => Math.min(devicePixelRatio || 1, 2);

    const mount = (img) => {
      if (!alive) return;
      let plate = null, pw = 0, ph = 0;
      const get = () => {
        const w = Math.round(fr.clientWidth * dpr()), h = Math.round(fr.clientHeight * dpr());
        if (w < 2 || h < 2) return null;
        if (!plate || w !== pw || h !== ph) { plate = clothPlate(img, w, h, FALLBACK[(work.tone || 0) % FALLBACK.length]); pw = w; ph = h; }
        return plate;
      };
      out = document.createElement("canvas");
      out.className = "cloth-out";
      out.setAttribute("aria-hidden", "true");
      fr.appendChild(out);
      inst = createCloth(out, get, { wind: 3, speed: 0.5, amplitude: 30, drape: 40, brush: 2.05, brushSize: 150, damping: 1, light: 0.5, sheen: 0.1, shadow: 0.25, cornerRadius: 20, perspective: 1200, pin: "top" });
      if (!inst) { out.remove(); out = null; return; }
      setOnCloth(true);
      const card = fr.closest(".card") || fr;
      card.__cloth = inst;
    };

    if (work.cover) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => mount(img);
      img.onerror = () => mount(null);
      img.src = withBase(work.cover);
    } else {
      mount(null);
    }
    return () => {
      alive = false;
      inst?.destroy();
      out?.remove();
      setOnCloth(false);
    };
  }, [work.cover, work.tone, enableCloth]);

  const hover = (v) => (e) => e.currentTarget.__cloth?.setEdge(v);

  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay: ((no - 1) % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/karya/${work.slug}`} onPointerEnter={hover(0.185)} onPointerLeave={hover(0.048)} data-cursor aria-label={work.title} className="contents">
        <div ref={frRef} className={`card-fr ${onCloth ? "on-cloth" : ""}`}>
          {work.cover && <img className="cover" src={withBase(work.cover)} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />}
          <div className="shade" />
          <span className="card-ar">
            <svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" strokeWidth="1.3" /></svg>
          </span>
          <div className="card-lab">
            <b>{work.title}</b>
            <Aksara className="jp">{jawaNumber(no)}</Aksara>
          </div>
        </div>
      </Link>
      <div className="card-meta">
        <span>{work.role}</span>
        <span>{String(no).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      </div>
      <div className="card-tags">
        {work.tags.map((tg) => <span className="tag" key={tg}>{tg}</span>)}
      </div>
      {big && <p className="body mt-3 max-w-[60ch]">{work.summary}</p>}
      <Link to={`/karya/${work.slug}`} className="arrowlink mt-3" data-cursor>
        <span>{label}</span>
        <span className="ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3" /></svg></span>
      </Link>
    </motion.article>
  );
}
