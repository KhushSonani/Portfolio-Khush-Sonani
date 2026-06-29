import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // Use the automatic JSX runtime — no React import needed
      jsxRuntime: "automatic",
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // ── Build optimisations ──────────────────────────────────────────────────
  build: {
    target: "es2020",
    // Raise the warning threshold slightly — we code-split everything anyway
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Manual code-splitting: isolate large third-party libs into separate chunks
        manualChunks: {
          // React core — cached by browser after first visit
          "vendor-react": ["react", "react-dom"],
          // Framer Motion — large but only needed for animation
          "vendor-framer": ["framer-motion"],
          // GSAP
          "vendor-gsap": ["gsap"],
          // Lenis
          "vendor-lenis": ["lenis"],
          // Icon libraries
          "vendor-icons": ["react-icons"],
        },
      },
    },

    // Minify with esbuild (default, fastest)
    minify: "esbuild",
    // Produce source maps only in dev
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
    // Asset inlining threshold — inline assets < 4 kB as base64
    assetsInlineLimit: 4096,
  },

  // ── Dev server ──────────────────────────────────────────────────────────
  server: {
    port: 5173,
    open: false,
  },

  // ── Preview server ──────────────────────────────────────────────────────
  preview: {
    port: 4173,
  },

  // ── CSS ─────────────────────────────────────────────────────────────────
  css: {
    devSourcemap: true,
  },
});
