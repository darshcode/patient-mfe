import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "patientApp",
      filename: "remoteEntry.js", // 👈 exposes this entry to shell
      exposes: {
        "./PatientAppComponent": "./src/PatientAppComponent.jsx",
      },
      shared: ["react", "react-dom", "@apollo/client", "lucide-react"],
    }),
  ],

  preview: {
    host: "0.0.0.0",
    port: 3003,
    strictPort: true,
    allowedHosts: ["patient-mfe.onrender.com"], // update based on Render URL
  },

  build: {
    modulePreload: false,
    target: "esnext",
    outDir: "dist", // ✅ Default output folder for Azure
    minify: false,
    cssCodeSplit: false,
  },
});
