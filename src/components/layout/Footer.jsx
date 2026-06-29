import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/constants";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";

const socials = [
  { icon: FaGithub,     href: PERSONAL_INFO.links.github,     label: "GitHub profile"     },
  { icon: FaLinkedin,   href: PERSONAL_INFO.links.linkedin,   label: "LinkedIn profile"   },
  { icon: SiLeetcode,   href: PERSONAL_INFO.links.leetcode,   label: "LeetCode profile"   },
  { icon: SiCodeforces, href: PERSONAL_INFO.links.codeforces, label: "Codeforces profile" },
  { icon: SiCodechef,   href: PERSONAL_INFO.links.codechef,   label: "CodeChef profile"   },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="relative border-t border-white/5 py-12 overflow-hidden"
    >
      {/* Animated gradient line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #8b5cf6, #6366f1, #ec4899, transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s linear infinite",
        }}
      />

      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-xl font-bold gradient-text mb-1" aria-label="Khush Sonani">
              Khush Sonani
            </p>
            <p className="text-gray-500 text-sm">Full Stack Developer · Competitive Programmer</p>
          </div>

          {/* Social links */}
          <nav aria-label="Social media links">
            <ul className="flex items-center gap-3" role="list">
              {socials.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${label} — opens in new tab`}
                    className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.93 }}
                  >
                    <Icon size={16} aria-hidden="true" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Built with */}
          <p className="text-gray-600 text-sm text-center md:text-right">
            Built with{" "}
            <span className="text-purple-400">React</span>,{" "}
            <span className="text-indigo-400">Tailwind CSS</span> &amp;{" "}
            <span className="text-pink-400">Framer Motion</span>
          </p>
        </div>

        <p className="mt-8 text-center text-gray-700 text-xs">
          <span aria-label={`Copyright ${year} Khush Sonani`}>
            © {year} Khush Sonani. All rights reserved.
          </span>
        </p>
      </div>
    </footer>
  );
}
