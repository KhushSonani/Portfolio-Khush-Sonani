import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Spring-smooth the scaleX so it doesn't jerk on fast scroll
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #8b5cf6, #6366f1, #ec4899)",
        }}
      />
      {/* Glow layer */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[9998] origin-left blur-sm"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #8b5cf6aa, #6366f1aa, #ec4899aa)",
        }}
      />
    </>
  );
}
