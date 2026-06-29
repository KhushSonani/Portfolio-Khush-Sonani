import { useRef } from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, fadeInUp, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientBlob from "@/components/ui/GradientBlob";
import TiltCard     from "@/components/ui/TiltCard";
import { CODING_PROFILES } from "@/lib/constants";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";

const ICON_MAP = {
  GitHub:     FaGithub,
  LinkedIn:   FaLinkedin,
  LeetCode:   SiLeetcode,
  Codeforces: SiCodeforces,
  CodeChef:   SiCodechef,
};

const EXTRA = {
  GitHub:     [{ label: "Repos",       val: "10+" },  { label: "Language", val: "JS / C++" }],
  LinkedIn:   [{ label: "Connections", val: "500+" }, { label: "Status",   val: "Open to Work" }],
  LeetCode:   [{ label: "Rating",      val: "2082" }, { label: "Rank",     val: "Knight" }],
  Codeforces: [{ label: "Rating",      val: "1454" }, { label: "Rank",     val: "Specialist" }],
  CodeChef:   [{ label: "Rating",      val: "1708" }, { label: "Stars",    val: "3★" }],
};

// ─── Profile card ─────────────────────────────────────────────────────────────
function ProfileCard({ profile, i }) {
  const Icon   = ICON_MAP[profile.platform];
  const extras = EXTRA[profile.platform] || [];
  const isWhite = profile.color === "#ffffff";

  return (
    <motion.div
      variants={staggerItem}
      custom={i}
    >
      <TiltCard maxTilt={7} perspective={800} glare>
        <motion.a
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex flex-col p-5 rounded-2xl overflow-hidden border border-white/8 h-full block group"
          style={{ background: "rgba(255,255,255,0.025)" }}
          whileHover={{ borderColor: `${profile.color === "#ffffff" ? "rgba(255,255,255,0.2)" : profile.color + "45"}` }}
          transition={{ duration: 0.22 }}
        >
          {/* Hover radial */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 60%, ${isWhite ? "rgba(255,255,255,0.04)" : profile.color + "0d"}, transparent 70%)` }} />
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ background: `linear-gradient(90deg, transparent, ${profile.color === "#ffffff" ? "rgba(255,255,255,0.4)" : profile.color + "80"}, transparent)` }} />

          <div className="relative z-10 flex flex-col h-full">
            {/* Icon row */}
            <div className="flex items-start justify-between mb-4">
              <motion.div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: profile.bg, border: `1px solid ${isWhite ? "rgba(255,255,255,0.12)" : profile.color + "28"}` }}
                whileHover={{ rotate: -8, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {Icon && <Icon size={20} style={{ color: profile.color }} />}
              </motion.div>

              {/* Arrow icon */}
              <motion.div
                className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: isWhite ? "rgba(255,255,255,0.08)" : `${profile.color}18` }}
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: isWhite ? "#9ca3af" : profile.color }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </div>

            <h3 className="text-white font-bold mb-0.5">{profile.platform}</h3>
            <p className="text-gray-600 text-xs font-mono mb-3">{profile.username}</p>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">{profile.description}</p>

            {/* Mini stats */}
            {extras.length > 0 && (
              <div className="flex gap-2 mb-4">
                {extras.map(({ label, val }) => (
                  <motion.div
                    key={label}
                    className="flex-1 text-center p-2 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                    whileHover={{ background: isWhite ? "rgba(255,255,255,0.07)" : `${profile.color}12` }}
                  >
                    <p className="text-white text-xs font-bold">{val}</p>
                    <p className="text-gray-600 text-[10px] mt-0.5">{label}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* CTA */}
            <motion.div
              className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: isWhite ? "#9ca3af" : profile.color }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.16 }}
            >
              Visit Profile →
            </motion.div>
          </div>
        </motion.a>
      </TiltCard>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CodingProfiles() {
  return (
    <section id="profiles" aria-label="Coding profiles" className="relative section-padding overflow-hidden">
      <GradientBlob className="top-0 left-1/2 -translate-x-1/2" color1="#8b5cf6" color2="#6366f1" size={600} opacity={0.06} />

      <div className="container-custom">
        <SectionLabel
          eyebrow="Coding Profiles"
          title="Find Me Online"
          description="Active across every major competitive programming and professional platform."
          center
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {CODING_PROFILES.map((profile, i) => (
            <ProfileCard key={profile.platform} profile={profile} i={i} />
          ))}
        </motion.div>

        <motion.p
          className="text-center text-gray-700 text-xs mt-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          Consistently active · Updated profiles · Real ratings
        </motion.p>
      </div>
    </section>
  );
}
