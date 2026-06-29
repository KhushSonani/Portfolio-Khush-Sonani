import { motion } from "framer-motion";
import { cardHover } from "@/lib/animations";

// Reusable glassmorphism card with optional hover animation
export default function GlassCard({
  children,
  className = "",
  hover = true,
  glowColor = "rgba(139,92,246,0.2)",
  ...props
}) {
  const Component = hover ? motion.div : "div";
  const motionProps = hover ? { variants: cardHover, initial: "rest", whileHover: "hover" } : {};

  return (
    <Component
      className={`relative glass rounded-2xl overflow-hidden ${className}`}
      {...motionProps}
      {...props}
    >
      {/* Shimmer overlay */}
      {hover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />
      )}
      {children}
    </Component>
  );
}
