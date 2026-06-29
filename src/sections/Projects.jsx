import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { staggerContainer, staggerItem, fadeInUp, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientBlob from "@/components/ui/GradientBlob";
import TechBadge    from "@/components/ui/TechBadge";
import TiltCard     from "@/components/ui/TiltCard";
import { useGSAPReveal } from "@/hooks/useGSAP";
import { PROJECTS }  from "@/lib/constants";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const NUM_LABELS = ["01", "02", "03"];
const PROJECT_ICONS = { ridesync: "🚗", portfolio: "✨", stms: "📊" };

// ─── Project card (tilt + expand) ─────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.12 }}
    >
      <TiltCard maxTilt={5} perspective={900} glare className="h-full">
        <motion.article
          className="relative group rounded-2xl overflow-hidden border border-white/8 flex flex-col h-full"
          style={{ background: "rgba(255,255,255,0.025)" }}
          whileHover={{ borderColor: `${project.color}42` }}
          transition={{ duration: 0.25 }}
        >
          {/* Top colour stripe — animated width on hover */}
          <div className="relative h-[2px] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 opacity-40"
              style={{ background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)` }} />
          </div>

          {/* Inner glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 70% 35% at 50% 0%, ${project.color}0e, transparent 60%)` }} />

          <div className="relative z-10 p-6 flex flex-col flex-1">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-start gap-3">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${project.color}14`, border: `1px solid ${project.color}28` }}
                  whileHover={{ rotate: -8, scale: 1.12 }}
                  transition={{ duration: 0.2 }}
                >
                  {PROJECT_ICONS[project.id] || "💡"}
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-gray-600">{NUM_LABELS[index] || "0" + (index + 1)}</span>
                    {project.featured && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}30` }}>
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight">{project.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{project.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {project.github && (
                  <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                    aria-label="GitHub" className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-colors border border-white/8"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                    whileHover={{ scale: 1.12, y: -1 }} whileTap={{ scale: 0.9 }}>
                    <FaGithub size={14} />
                  </motion.a>
                )}
                {project.live && (
                  <motion.a href={project.live} target="_blank" rel="noopener noreferrer"
                    aria-label="Live demo" className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ background: `${project.color}22`, border: `1px solid ${project.color}40` }}
                    whileHover={{ scale: 1.12, background: `${project.color}44`, y: -1 }} whileTap={{ scale: 0.9 }}>
                    <FaExternalLinkAlt size={11} />
                  </motion.a>
                )}
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((t) => <TechBadge key={t} label={t} color={project.color} />)}
            </div>

            {/* Expandable highlights */}
            <div className="mt-auto">
              <motion.button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1.5 text-xs font-medium"
                style={{ color: project.color }}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
              >
                {expanded ? "Hide details" : "Show highlights"}
                <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <HiChevronDown size={13} />
                </motion.span>
              </motion.button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="pt-3 space-y-1.5">
                      {project.highlights.map((h, hi) => (
                        <motion.li
                          key={h}
                          className="flex items-start gap-2 text-xs text-gray-500"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: hi * 0.05 }}
                        >
                          <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.color }} />
                          {h}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.article>
      </TiltCard>
    </motion.div>
  );
}

// ─── Featured banner ──────────────────────────────────────────────────────────
function FeaturedBanner({ project }) {
  const ref = useRef(null);
  useGSAPReveal(ref, { y: 30, stagger: 0.1 });

  return (
    <motion.div
      variants={fadeInUp}
      className="relative rounded-2xl overflow-hidden border border-white/8 mb-8 group"
      style={{ background: "rgba(255,255,255,0.025)" }}
      whileHover={{ borderColor: `${project.color}45` }}
      transition={{ duration: 0.25 }}
    >
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: `linear-gradient(180deg, ${project.color}, transparent)` }}
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 50% 100% at 0% 50%, ${project.color}09, transparent)` }} />

      <div ref={ref} className="relative z-10 p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center">
        {/* Left */}
        <div data-reveal>
          <motion.div
            className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}30` }}
            animate={{ boxShadow: [`0 0 0px ${project.color}00`, `0 0 12px ${project.color}40`, `0 0 0px ${project.color}00`] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            🔥 Flagship Project
          </motion.div>
          <h3 className="text-white font-black text-2xl md:text-3xl mb-1">{project.title}</h3>
          <p className="text-gray-500 text-sm mb-3">{project.subtitle}</p>
          <p className="text-gray-400 leading-relaxed text-sm mb-5">{project.description}</p>

          <div className="flex items-center gap-3">
            {project.github && (
              <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white border border-white/12 hover:border-white/25 transition-colors"
                style={{ background: "rgba(255,255,255,0.05)" }}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <FaGithub size={14} /> GitHub
              </motion.a>
            )}
            {project.live && (
              <motion.a href={project.live} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: `${project.color}28`, border: `1px solid ${project.color}45` }}
                whileHover={{ scale: 1.03, background: `${project.color}45` }} whileTap={{ scale: 0.97 }}>
                <FaExternalLinkAlt size={11} /> Live Demo
              </motion.a>
            )}
          </div>
        </div>

        {/* Right — highlights */}
        <div data-reveal className="space-y-2">
          <p className="text-gray-600 text-xs uppercase tracking-widest mb-3">Key Features</p>
          {project.highlights.map((h, i) => (
            <motion.div
              key={h}
              className="flex items-start gap-2.5 text-sm text-gray-400"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ x: 3, color: "#e2e8f0" }}
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.color }} />
              {h}
            </motion.div>
          ))}
          <div className="flex flex-wrap gap-2 pt-3">
            {project.tech.map((t) => <TechBadge key={t} label={t} color={project.color} />)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" aria-label="Projects" className="relative section-padding overflow-hidden">
      <GradientBlob className="-top-24 -right-24" color1="#8b5cf6" color2="#ec4899" size={550} opacity={0.08} />
      <GradientBlob className="bottom-0 left-0"   color1="#6366f1" color2="#8b5cf6" size={350} opacity={0.06} />

      <div className="container-custom">
        <SectionLabel
          eyebrow="Projects"
          title="Things I've Built"
          description="Real-world projects with production-grade architecture, shipped from scratch."
        />

        {/* Featured banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <FeaturedBanner project={PROJECTS[0]} />
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.slice(1).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 1} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.3 }}
        >
          <motion.a
            href="https://github.com/KhushSonani"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/10 text-gray-400 text-sm font-medium"
            style={{ background: "rgba(255,255,255,0.03)" }}
            whileHover={{ borderColor: "rgba(139,92,246,0.4)", color: "#e2e8f0", y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <FaGithub size={15} />
            <span>View all on GitHub</span>
            <motion.svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              animate={{ x: [0, 3, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
