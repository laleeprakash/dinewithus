import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',       // default, but make it explicit
    emptyOutDir: true     // clean output dir before building
  },
  server: {
    port: 5173,           // optional, for local dev
    open: true            // opens browser automatically
  }
})
