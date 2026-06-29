import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAPTextReveal } from "@/hooks/useGSAP";
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";

/**
 * SectionLabel — eyebrow + animated title + description.
 * Uses GSAP for the title skew-reveal, Framer Motion for the rest.
 */
export default function SectionLabel({
  eyebrow,
  title,
  description,
  center = false,
}) {
  const titleRef = useRef(null);
  useGSAPTextReveal(titleRef, { y: 40, skewY: 2, duration: 0.85 });

  const align = center ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      className={`flex flex-col gap-3 ${align} mb-14 md:mb-16`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {eyebrow && (
        <motion.span
          variants={staggerItem}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-purple-400"
        >
          <span
            className="block h-px"
            style={{ width: 20, background: "linear-gradient(90deg,#8b5cf6,transparent)" }}
          />
          {eyebrow}
          <span
            className="block h-px"
            style={{ width: 20, background: "linear-gradient(270deg,#8b5cf6,transparent)" }}
          />
        </motion.span>
      )}

      <h2
        ref={titleRef}
        className="text-4xl md:text-5xl font-black text-white leading-[1.08] tracking-tight"
        style={{ willChange: "transform, opacity" }}
      >
        {title}
      </h2>

      {description && (
        <motion.p
          variants={staggerItem}
          className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
