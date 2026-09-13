import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (prefersReduced || !canHover) return;

    document.body.classList.add("has-custom-cursor");
    const el = cursorRef.current;
    if (!el) return;

    let frame;
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      el.style.opacity = "1";
    };
    const onLeaveWindow = () => (el.style.opacity = "0");
    const onDown = () => el.classList.add("scale-[0.6]");
    const onUp = () => el.classList.remove("scale-[0.6]");

    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeaveWindow);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const attachHoverTargets = () => {
      const targets = document.querySelectorAll(
        "a, button, [data-cursor-hover]"
      );
      targets.forEach((t) => {
        t.addEventListener("mouseenter", () =>
          el.classList.add("w-12", "h-12", "bg-accent/10")
        );
        t.addEventListener("mouseleave", () =>
          el.classList.remove("w-12", "h-12", "bg-accent/10")
        );
      });
    };
    attachHoverTargets();
    // re-attach saat DOM berubah (navigasi antar halaman)
    const observer = new MutationObserver(attachHoverTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveWindow);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      observer.disconnect();
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[999] h-5 w-5 rounded-full border border-accent opacity-0 transition-[width,height,background-color,transform] duration-200 ease-out"
      aria-hidden="true"
    />
  );
}