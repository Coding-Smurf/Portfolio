import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // El repositorio se publica como proyecto de GitHub Pages en /Portfolio/.
  base: '/Portfolio/',
  server: {
    watch: {
      usePolling: true,
    },
    port: 5173,
    host: true,
  },
})
