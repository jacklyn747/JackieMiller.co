import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the build works from any folder or host.
// Output lands in the main site's /public so jackiemiller.co serves it
// at /lessons/why-blonde-goes-brassy/ (ready for a Webflow iframe).
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "../../public/lessons/why-blonde-goes-brassy",
    emptyOutDir: true,
  },
});
