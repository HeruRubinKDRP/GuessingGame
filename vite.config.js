import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    // Default to this repo path, but allow CI/workflows to override when needed.
    base: process.env.VITE_BASE_PATH || "/GuessingGame/",
});