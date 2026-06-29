import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MouseSpotlight — smooth, spring-eased radial gradient that follows the cursor.
 * Defaults to the hero section. Works on any positioned parent.
 */
export default function MouseSpotlight({
  color = "rgba(139,92,246,0.08)",
  size = 700,
  stiffness = 120,
  damping = 18,
}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping });
  const y = useSpring(rawY, { stiffness, damping });
  const parentRef = useRef(null);

  useEffect(() => {
    const el = parentRef.current?.parentElement;
    if (!el) return;

    const move = (e) => {
      const rect = el.getBoundingClientRect();
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    };

    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={parentRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        background: `radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 70%)`,
      }}
    />
  );
}
