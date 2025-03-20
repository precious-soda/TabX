import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0", // Allow access from outside the container
    port: 5173,
    strictPort: true,
  },
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
})
