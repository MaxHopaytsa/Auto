import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
    base: "/Auto/",
    plugins: [react()],
    build: {
        reactStrictMode: false,
    },
})
