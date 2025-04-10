import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "patientApp",
      filename: "remoteEntry.js",
      exposes: {
        "./PatientDashboard": "./src/components/PatientDashboard.jsx",
      },
      shared: ["react", "react-dom", "@apollo/client", "bootstrap"],
      build: true,
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT) || 3003,
  },
  preview: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT) || 3003,
    allowedHosts: ["patient-mfe.onrender.com"],
  },
  build: {
    target: "esnext",
    outDir: "dist",
  },
});
