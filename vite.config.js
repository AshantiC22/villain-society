import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    // ── Code splitting — loads faster ──
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          stripe: ["@stripe/react-stripe-js", "@stripe/stripe-js"],
        },
      },
    },

    // ── Compress output ──
    minify: "terser",
    cssMinify: true,
    chunkSizeWarningLimit: 1000,

    // ── Asset optimization ──
    assetsInlineLimit: 4096,
  },

  // ── Faster dev server ──
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },

  // ── Image optimization ──
  assetsInclude: [
    "**/*.mp4",
    "**/*.webm",
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.gif",
    "**/*.svg",
    "**/*.ico",
  ],
});
