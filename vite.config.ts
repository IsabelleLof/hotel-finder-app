import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/xotelo": {
        target: "https://data.xotelo.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/xotelo/, "/api"),
      },
    },
  },
});

