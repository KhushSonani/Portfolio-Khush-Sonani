import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientBlob from "@/components/ui/GradientBlob";
import TechBadge    from "@/components/ui/TechBadge";
import { useGSAPReveal } from "@/hooks/useGSAP";
import { EXPERIENCE } from "@/lib/constants";
import { HiBriefcase, HiOfficeBuilding } from "react-icons/hi";

// Bullets now come from constants.js — see exp.bullets

// ─── Animated timeline line ───────────────────────────────────────────────────
function TimelineLine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="absolute left-5 top-0 w-px overflow-hidden" style={{ height: "calc(100% - 80px)" }}>
      <motion.div
        className="w-full rounded-full"
        style={{ background: "linear-gradient(180deg,#8b5cf6,#6366f1 60%,transparent)", height: "100%" }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
      />
    </div>
  );
}

// ─── Experience card ──────────────────────────────────────────────────────────
function ExperienceCard({ exp, i }) {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 md:gap-8"
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.15 }}
    >
      {/* Dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className="w-11 h-11 rounded-full flex items-center justify-center z-10 flex-shrink-0"
          style={{
            background: "linear-gradient(135deg,#8b5cf6,#6366f1)",
            boxShadow: "0 0 24px rgba(139,92,246,0.5)",
          }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.45, type: "spring", stiffness: 320, delay: i * 0.15 + 0.1 }}
          whileHover={{ scale: 1.12, boxShadow: "0 0 36px rgba(139,92,246,0.7)" }}
        >
          <HiBriefcase size={18} className="text-white" />
        </motion.div>
        <div className="flex-1 w-px mt-3 border-l border-dashed border-purple-500/20" />
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 relative p-6 rounded-2xl overflow-hidden group mb-10 border border-white/8"
        style={{ background: "rgba(255,255,255,0.025)" }}
        whileHover={{ borderColor: "rgba(139,92,246,0.38)", y: -3 }}
        transition={{ duration: 0.25 }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "radial-gradient(circle at 100% 0, rgba(139,92,246,0.08), transparent 55%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)" }} />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="text-white font-bold text-xl leading-tight">{exp.role}</h3>
              <div className="flex items-center gap-2 mt-1.5">
                <HiOfficeBuilding size={13} className="text-purple-400 flex-shrink-0" />
                <p className="text-purple-400 font-medium text-sm">{exp.company}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <motion.span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.25)" }}
                whileHover={{ scale: 1.05 }}
              >
                {exp.type}
              </motion.span>
              <span className="text-gray-500 text-xs font-mono">{exp.period}</span>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed text-sm mb-5">{exp.description}</p>

          {/* Bullet list with stagger */}
          <motion.ul
            className="space-y-2.5 mb-5"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {(exp.bullets || []).map((b, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-2.5 text-sm text-gray-500"
                variants={staggerItem}
              >
                <motion.span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#8b5cf6" }}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: idx * 0.07 + 0.3, type: "spring" }}
                />
                {b}
              </motion.li>
            ))}
          </motion.ul>

          <div className="flex flex-wrap gap-2">
            {exp.tech.map((t) => <TechBadge key={t} label={t} color="#8b5cf6" />)}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <section id="experience" aria-label="Work experience" className="relative section-padding overflow-hidden">
      <GradientBlob className="top-20 right-0" color1="#6366f1" color2="#8b5cf6" size={440} opacity={0.08} />

      <div className="container-custom">
        <SectionLabel
          eyebrow="Work Experience"
          title="Professional Journey"
          description="Real-world experience — shipping production code and collaborating on a live codebase."
        />

        <div className="max-w-3xl relative">
          <TimelineLine />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {EXPERIENCE.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} i={i} />
            ))}

            {/* Open-to-work tail */}
            <motion.div variants={staggerItem} className="flex gap-6 md:gap-8">
              <div className="flex flex-col items-center flex-shrink-0">
                <motion.div
                  className="w-11 h-11 rounded-full flex items-center justify-center border-2 border-dashed border-purple-500/35 z-10"
                  style={{ background: "rgba(139,92,246,0.06)" }}
                  animate={{ borderColor: ["rgba(139,92,246,0.3)", "rgba(139,92,246,0.7)", "rgba(139,92,246,0.3)"] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <span className="text-lg">🚀</span>
                </motion.div>
              </div>

              <div className="flex-1 p-5 rounded-2xl border border-dashed border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-white text-sm font-semibold">What's Next?</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Actively seeking SDE internships &amp; full-time roles — 2025/2026
                  </p>
                </div>
                <motion.button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)", boxShadow: "0 0 20px rgba(139,92,246,0.35)" }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(139,92,246,0.55)" }}
                  whileTap={{ scale: 0.96 }}
                >
                  Let's Talk
                  <motion.svg
                    className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
