import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
        dedupe: ["react", "react-dom"],
    },
    optimizeDeps: {
        include: [
            "react",
            "react-dom",
            "react-dom/client",
            "react/jsx-runtime",
            "framer-motion",
            "react-router-dom",
            "lucide-react",
            "@base-ui/react",
            "react-hook-form",
            "@hookform/resolvers/zod",
            "zod",
        ],
    },
});
