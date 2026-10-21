import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

// Magic UI-style confetti: one short, three-burst moment on mount. Skipped for reduced motion.
export function Confetti({ colors }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fire = confetti.create(ref.current, { resize: true, useWorker: false });
    const base = { startVelocity: 38, ticks: 200, scalar: 0.9, colors, gravity: 0.9 };
    fire({ ...base, particleCount: 40, spread: 70, angle: 60, origin: { x: 0.1, y: 0.75 } });
    fire({ ...base, particleCount: 40, spread: 70, angle: 120, origin: { x: 0.9, y: 0.75 } });
    const t = setTimeout(() => fire({ ...base, particleCount: 50, spread: 100, origin: { x: 0.5, y: 0.6 } }), 400);
    return () => {
      clearTimeout(t);
      fire.reset();
    };
  }, [colors]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-50 h-full w-full" />;
}
