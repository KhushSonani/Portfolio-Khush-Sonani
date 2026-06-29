// Animated grid background component
export default function AnimatedGrid({ opacity = 1 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
    >
      {/* Animated moving grid */}
      <div className="absolute inset-0 animated-grid" />
      {/* Radial gradient vignette over the grid */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #050505 100%)",
        }}
      />
    </div>
  );
}
