import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["contextMenus", "storage"],
    name: "Wheather Extension",
    version: "0.0.1",
    description: "Wheather Extension",
  },

  entrypointsDir: "app",
  vite: () => ({
    plugins: [react()],
  }),
});
