// Decorative soft gradient blobs for ambient background lighting
export default function GradientBlob({
  className = "",
  color1 = "#8b5cf6",
  color2 = "#6366f1",
  size = 600,
  opacity = 0.15,
  blur = 120,
}) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1}, ${color2}, transparent 70%)`,
        opacity,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}
