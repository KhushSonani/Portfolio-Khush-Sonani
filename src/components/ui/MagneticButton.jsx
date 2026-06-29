import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticButton — cursor-attracted spring magnetic effect.
 * Wraps any children, applies subtle x/y pull on hover.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 28,
  springConfig = { stiffness: 280, damping: 18 },
}) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const onMouseMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set(((e.clientX - cx) / (rect.width  / 2)) * strength);
    rawY.set(((e.clientY - cy) / (rect.height / 2)) * strength);
  }, [rawX, rawY, strength]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}
