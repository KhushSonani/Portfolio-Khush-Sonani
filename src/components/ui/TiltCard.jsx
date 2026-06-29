import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * TiltCard — subtle 3-D tilt on mouse hover using spring-smoothed values.
 * Wrap any card content with this for premium depth feel.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  perspective = 900,
  glare = true,
  ...props
}) {
  const ref = useRef(null);
  const rawRotX = useMotionValue(0);
  const rawRotY = useMotionValue(0);
  const rotX = useSpring(rawRotX, { stiffness: 220, damping: 22 });
  const rotY = useSpring(rawRotY, { stiffness: 220, damping: 22 });

  // Glare position derived from rotation
  const glareX = useTransform(rotY, [-maxTilt, maxTilt], ["0%", "100%"]);
  const glareY = useTransform(rotX, [maxTilt, -maxTilt], ["0%", "100%"]);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 → 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    rawRotY.set(x * maxTilt * 2);
    rawRotX.set(-y * maxTilt * 2);
  }, [rawRotX, rawRotY, maxTilt]);

  const onMouseLeave = useCallback(() => {
    rawRotX.set(0);
    rawRotY.set(0);
  }, [rawRotX, rawRotY]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: perspective,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}

      {/* Glare overlay */}
      {glare && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden z-20"
          style={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.07), transparent 55%)`,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
