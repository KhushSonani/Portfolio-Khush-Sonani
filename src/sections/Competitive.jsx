import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight, viewportConfig } from "@/lib/animations";
import SectionLabel    from "@/components/ui/SectionLabel";
import GradientBlob    from "@/components/ui/GradientBlob";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import TiltCard        from "@/components/ui/TiltCard";
import { useGSAPReveal } from "@/hooks/useGSAP";
import { COMPETITIVE_STATS, CONTEST_HIGHLIGHTS } from "@/lib/constants";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import { HiTrendingUp } from "react-icons/hi";

const PLATFORM_ICONS = {
  LeetCode: SiLeetcode,
  Codeforces: SiCodeforces,
  CodeChef: SiCodechef,
  "Problems Solved": HiTrendingUp,
};

const MILESTONES = [
  { icon: "⚡", label: "Daily streaks maintained", val: "300+ days", color: "#f59e0b" },
  { icon: "🎯", label: "Hard problems solved",     val: "200+",     color: "#8b5cf6" },
  { icon: "🏅", label: "Rated contests entered",   val: "80+",      color: "#06b6d4" },
  { icon: "📈", label: "Peak LeetCode global rank", val: "Top 1.67%", color: "#10b981" },
];

// ─── Stat card with TiltCard ──────────────────────────────────────────────────
function StatCard({ stat }) {
  const Icon = PLATFORM_ICONS[stat.platform] || HiTrendingUp;
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <TiltCard maxTilt={8} perspective={800} glare>
      <motion.div
        ref={ref}
        className="relative p-6 rounded-2xl overflow-hidden group cursor-default flex flex-col h-full"
        style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${stat.color}22` }}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ borderColor: `${stat.color}60` }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 110%, ${stat.color}18, transparent 65%)` }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${stat.color}90, transparent)` }} />

        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}28` }}
            whileHover={{ rotate: -10, scale: 1.12 }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={18} style={{ color: stat.color }} />
          </motion.div>

          <div className="text-4xl font-black tabular-nums mb-1" style={{ color: stat.color }}>
            <AnimatedCounter end={stat.rating} duration={2} />
          </div>
          <div className="text-white font-semibold text-sm mb-2">{stat.platform}</div>

          <div className="mt-auto">
            <motion.span
              className="inline-block px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: `${stat.color}15`, color: stat.color, border: `1px solid ${stat.color}30` }}
              whileHover={{ scale: 1.06 }}
            >
              {stat.rank}{stat.percentile && ` · ${stat.percentile}`}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

// ─── Contest row ──────────────────────────────────────────────────────────────
function ContestRow({ c, i }) {
  return (
    <motion.div
      className="relative flex items-center gap-4 p-4 rounded-xl overflow-hidden group border border-white/8"
      style={{ background: "rgba(255,255,255,0.02)" }}
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportConfig}
      transition={{ delay: i * 0.09, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ borderColor: "rgba(139,92,246,0.4)", x: 3 }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.08), transparent)" }} />

      {/* Rank badge */}
      <motion.div
        className="w-16 text-center py-1.5 rounded-lg text-sm font-black flex-shrink-0"
        style={{ background: "rgba(139,92,246,0.14)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.28)" }}
        whileHover={{ scale: 1.08 }}
      >
        #{c.rank}
      </motion.div>

      <div className="relative z-10 flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{c.contest}</p>
        <p className="text-gray-500 text-xs mt-0.5">🌍 Global Rank</p>
      </div>

      <motion.div
        className="relative z-10 text-lg flex-shrink-0"
        animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
      >🏆</motion.div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Competitive() {
  const milestonesRef = useRef(null);
  useGSAPReveal(milestonesRef, { y: 18, stagger: 0.1 });

  return (
    <section id="competitive" aria-label="Competitive programming" className="relative section-padding overflow-hidden">
      <GradientBlob className="top-0 left-0"    color1="#f59e0b" color2="#8b5cf6" size={550} opacity={0.07} />
      <GradientBlob className="bottom-0 right-0" color1="#06b6d4" color2="#6366f1" size={400} opacity={0.06} />

      <div className="container-custom">
        <SectionLabel
          eyebrow="Competitive Programming"
          title="Ranked. Rated. Relentless."
          description="2600+ problems across LeetCode, Codeforces, and CodeChef — consistency built over hundreds of contests."
          center
        />

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {COMPETITIVE_STATS.map((stat) => (
            <StatCard key={stat.platform} stat={stat} />
          ))}
        </div>

        {/* Contest highlights + milestones */}
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left — contests */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                className="w-1 h-5 rounded-full"
                style={{ background: "linear-gradient(180deg,#8b5cf6,#6366f1)" }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
              <h3 className="text-white font-semibold">Top Contest Highlights</h3>
            </div>
            <div className="space-y-2.5">
              {CONTEST_HIGHLIGHTS.map((c, i) => (
                <ContestRow key={i} c={c} i={i} />
              ))}
            </div>
          </motion.div>

          {/* Right — milestones */}
          <motion.div
            ref={milestonesRef}
            className="lg:col-span-2 flex flex-col gap-3"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                className="w-1 h-5 rounded-full"
                style={{ background: "linear-gradient(180deg,#f59e0b,#8b5cf6)" }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
              <h3 className="text-white font-semibold">Milestones</h3>
            </div>

            {MILESTONES.map(({ icon, label, val, color }) => (
              <motion.div
                key={label}
                data-reveal
                className="relative flex items-center gap-4 p-4 rounded-xl overflow-hidden group border border-white/8"
                style={{ background: "rgba(255,255,255,0.02)" }}
                whileHover={{ borderColor: `${color}40`, x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}08)` }} />
                <motion.span
                  className="text-xl flex-shrink-0"
                  whileHover={{ scale: 1.2, rotate: -8 }}
                  transition={{ duration: 0.18 }}
                >{icon}</motion.span>
                <div className="flex-1 min-w-0 relative z-10">
                  <p className="text-gray-500 text-xs">{label}</p>
                  <p className="text-white text-sm font-semibold">{val}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
