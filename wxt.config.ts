import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["contextMenus", "storage", "notifications"],
    name: "WeatherNow+",
    version: "0.0.1",
    description:
      "WeatherNow+ is a weather extension for chrome that shows the weather of the city you want to see.",
    short_name: "WeatherNow+",
    author: "Halil İbrahim Celik",
  },

  entrypointsDir: "app",
  vite: () => ({
    plugins: [react()],
  }),
});
