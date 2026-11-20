import { useEffect, useState } from "react";

// Efek mengetik (pengganti typed.js), tanpa library tambahan.
export default function useTyped(items, { typeSpeed = 80, backSpeed = 45, backDelay = 1800 } = {}) {
  const [text, setText] = useState(items?.[0] ?? "");
  const key = (items || []).join("|");

  useEffect(() => {
    if (!items || !items.length) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(items[0]);
      return;
    }
    let i = 0;
    let j = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = items[i];
      if (!deleting) {
        j += 1;
        setText(word.slice(0, j));
        if (j === word.length) {
          deleting = true;
          timer = setTimeout(tick, backDelay);
          return;
        }
        timer = setTimeout(tick, typeSpeed);
      } else {
        j -= 1;
        setText(word.slice(0, j));
        if (j === 0) {
          deleting = false;
          i = (i + 1) % items.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, backSpeed);
      }
    };
    setText("");
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return text;
}
