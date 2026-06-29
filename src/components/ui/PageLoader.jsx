import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=counting 1=done 2=exit

  useEffect(() => {
    // Fast synthetic progress
    const steps = [10, 25, 42, 60, 74, 85, 93, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(interval);
        setPhase(1);
        setTimeout(() => setPhase(2), 400);
        setTimeout(() => setLoading(false), 900);
      }
    }, 90);
    return () => clearInterval(interval);
  }, []);

  const letters = ["K", "S"];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
          style={{ background: "#050505" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Logo letter reveal */}
          <div className="relative mb-10 flex items-end gap-0.5">
            {letters.map((l, i) => (
              <motion.span
                key={l}
                className="text-6xl font-black leading-none"
                style={{ background: "linear-gradient(135deg,#a78bfa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {l}
              </motion.span>
            ))}

            {/* Dot accent */}
            <motion.span
              className="w-2 h-2 rounded-full mb-1 ml-1 flex-shrink-0"
              style={{ background: "#8b5cf6" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 400 }}
            />
          </div>

          {/* Progress track */}
          <div className="w-40 h-[2px] bg-white/6 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg,#8b5cf6,#6366f1,#ec4899)" }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="mt-3 text-gray-700 text-xs font-mono tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {progress}%
          </motion.p>

          {/* "Done" flash */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.p
                className="absolute bottom-12 text-purple-500/60 text-xs tracking-widest uppercase font-medium"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                Ready
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
