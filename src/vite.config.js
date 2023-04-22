import { defineConfig } from "vite";

export default defineConfig({
  outDir: "/build",
  rollupOptions: {
    output: {
      file: "addon.js",
    },
  },
});
