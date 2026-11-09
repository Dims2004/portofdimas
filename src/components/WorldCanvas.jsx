import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { sceneStore, useScene } from "../lib/sceneStore";
import { camFor } from "../lib/routes";

// Kanvas 3D yang menempel di belakang seluruh situs. Tiap halaman menahan
// kamera di waypoint-nya sendiri; pindah halaman = kamera berjalan ke sana.
export default function WorldCanvas() {
  const ref = useRef(null);
  const { pathname } = useLocation();
  const ready = useScene((s) => s.ready);

  useEffect(() => {
    let world = null;
    let cancelled = false;
    const fail = (err) => {
      console.warn("[world] WebGL tidak tersedia, memakai tampilan cadangan:", err);
      document.documentElement.classList.add("no-webgl");
      sceneStore.set({ ready: true, webgl: false });
    };
    const timer = setTimeout(async () => {
      try {
        const { createWorld } = await import("../world/createWorld");
        const w = await createWorld(ref.current, {
          onProgress: (p) => sceneStore.set({ loading: p }),
          onLost: () => fail("context lost"),
          quality: new URLSearchParams(location.search).get("q") || undefined,
        });
        if (cancelled) { w.dispose(); return; }
        world = w;
        sceneStore.world = w;
        w.setPinned(camFor(location.hash.replace(/^#/, "") || "/"));
        w.start();
        sceneStore.set({ ready: true, webgl: true, loading: 1 });
      } catch (err) {
        fail(err);
      }
    }, 40);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (world) { world.dispose(); sceneStore.world = null; }
    };
  }, []);

  useEffect(() => {
    sceneStore.set({ active: camFor(pathname) });
    sceneStore.world?.setPinned(camFor(pathname));
  }, [pathname, ready]);

  return <canvas id="gl" ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
