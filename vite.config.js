import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin.js";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/elementsmith/" : "/",
  plugins: [sites()],
  build: {
    outDir: "dist/client",
    emptyOutDir: true,
  },
});
