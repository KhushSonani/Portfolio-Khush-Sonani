import { useMemo, useEffect, useRef } from "react";
import { gsap } from "@/hooks/useGSAP";

/**
 * FloatingParticles — GSAP-animated ambient particle field.
 * Each particle has independent float + drift + opacity cycle.
 * Significantly smoother than CSS animation on many particles.
 */
export default function FloatingParticles({ count = 22, color = "#8b5cf6" }) {
  const containerRef = useRef(null);

  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 0.8,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.25 + 0.05,
    })), [count]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = containerRef.current?.querySelectorAll(".particle");
      if (!els) return;

      els.forEach((el, i) => {
        const duration = 6 + Math.random() * 5;
        const driftX = (Math.random() - 0.5) * 40;
        const driftY = (Math.random() - 0.5) * 40;

        gsap.to(el, {
          x: driftX,
          y: driftY,
          opacity: Math.random() * 0.3 + 0.05,
          duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: Math.random() * duration,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [count]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle absolute rounded-full will-change-transform"
          style={{
            width:  p.size,
            height: p.size,
            left:   `${p.x}%`,
            top:    `${p.y}%`,
            background: color,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
