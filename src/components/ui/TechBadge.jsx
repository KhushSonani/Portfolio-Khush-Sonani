import { motion } from "framer-motion";

// Small animated tech/skill badge
export default function TechBadge({ label, color = "#8b5cf6" }) {
  return (
    <motion.span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
      style={{
        color,
        borderColor: `${color}40`,
        background: `${color}10`,
      }}
      whileHover={{ scale: 1.05, borderColor: `${color}80` }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.span>
  );
}
