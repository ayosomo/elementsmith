import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin.js";

export default defineConfig({
  plugins: [sites()],
  build: {
    outDir: "dist/client",
    emptyOutDir: true,
  },
});
