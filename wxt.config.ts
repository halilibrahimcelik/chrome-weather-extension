import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["contextMenus", "storage", "tabs", "notifications"],
    name: "Wheather Extension App",
    version: "0.0.1",
    description: "Wheather Extension app",
  },

  entrypointsDir: "app",
  vite: () => ({
    plugins: [react()],
  }),
});
