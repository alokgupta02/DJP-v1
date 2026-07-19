import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5175,
    proxy: {
      "/djp/api/v1": {
        target: "http://localhost:8082",
        changeOrigin: true,
      },
      "/oauth2": {
        target: "http://localhost:8082",
        changeOrigin: true,
      },
      "/login/oauth2": {
        target: "http://localhost:8082",
        changeOrigin: true,
      },
      "/h2-console": {
        target: "http://localhost:8082",
        changeOrigin: true,
      },
    },
  },
});