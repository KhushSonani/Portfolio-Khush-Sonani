import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientBlob from "@/components/ui/GradientBlob";
import TiltCard     from "@/components/ui/TiltCard";
import { ACHIEVEMENTS } from "@/lib/constants";

const TIMELINE = [
  { year: "2026", event: "Won CPL 2026 — Competitive Programming League at Nirma University", color: "#f59e0b" },
  { year: "2025", event: "Reached LeetCode Knight rating (2082) — Top 1.67% globally",         color: "#8b5cf6" },
  { year: "2025", event: "Achieved Codeforces Specialist rank (Rating 1454)",                   color: "#06b6d4" },
  { year: "2024", event: "Crossed 2600+ total problems solved across all platforms",            color: "#10b981" },
  { year: "2024", event: "Global Rank #148 in CodeChef Beginner Contest",                       color: "#f97316" },
  { year: "2023", event: "Started B.Tech CSE at Nirma University — CGPA 8.52",                  color: "#a78bfa" },
];

// ─── Trophy card ──────────────────────────────────────────────────────────────
function TrophyCard({ a, i }) {
  return (
    <TiltCard maxTilt={9} perspective={700} glare>
      <motion.div
        className="relative p-5 rounded-2xl overflow-hidden group border border-white/8 text-center flex flex-col items-center h-full"
        style={{ background: "rgba(255,255,255,0.025)" }}
        initial={{ opacity: 0, y: 28, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={viewportConfig}
        transition={{ delay: i * 0.08, duration: 0.55, type: "spring", stiffness: 260 }}
        whileHover={{ borderColor: `${a.color}50` }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% -10%, ${a.color}18, transparent 65%)` }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${a.color}80, transparent)` }} />

        {/* Floating icon */}
        <motion.div
          className="text-4xl mb-3 relative z-10"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
        >
          {a.icon}
        </motion.div>

        <h3 className="relative z-10 text-white font-semibold text-sm mb-1 leading-snug">{a.title}</h3>
        <p className="relative z-10 text-gray-500 text-xs">{a.subtitle}</p>

        <motion.div
          className="relative z-10 mt-3 w-2 h-2 rounded-full"
          style={{ background: a.color }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
        />
      </motion.div>
    </TiltCard>
  );
}

// ─── Timeline row ─────────────────────────────────────────────────────────────
function TimelineRow({ item, i, total }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-5"
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Dot + connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className="w-3 h-3 rounded-full mt-1"
          style={{ background: item.color, boxShadow: `0 0 10px ${item.color}70` }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: i * 0.1 + 0.1, type: "spring", stiffness: 400 }}
        />
        {i < total - 1 && (
          <motion.div
            className="flex-1 w-px mt-2"
            style={{ background: `linear-gradient(180deg, ${item.color}50, transparent)` }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        className="pb-7"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.18 }}
      >
        <motion.span
          className="inline-block text-xs font-mono font-bold px-2.5 py-0.5 rounded-full mb-2"
          style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}32` }}
          whileHover={{ scale: 1.06 }}
        >
          {item.year}
        </motion.span>
        <p className="text-gray-300 text-sm leading-relaxed">{item.event}</p>
      </motion.div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Achievements() {
  return (
    <section id="achievements" aria-label="Achievements" className="relative section-padding overflow-hidden">
      <GradientBlob className="-top-20 right-0" color1="#f59e0b" color2="#8b5cf6" size={450} opacity={0.07} />
      <GradientBlob className="bottom-0 left-0"  color1="#6366f1" color2="#ec4899" size={350} opacity={0.06} />

      <div className="container-custom">
        <SectionLabel
          eyebrow="Achievements"
          title="Earned, Not Given"
          description="Recognition built through consistency, competition, and continuous improvement."
          center
        />

        {/* Trophy grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {ACHIEVEMENTS.map((a, i) => (
            <TrophyCard key={i} a={a} i={i} />
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07))" }} />
            <span className="text-gray-600 text-xs uppercase tracking-widest font-medium px-3">Journey Timeline</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.07))" }} />
          </div>

          <div>
            {TIMELINE.map((item, i) => (
              <TimelineRow key={i} item={item} i={i} total={TIMELINE.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
