import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Client-side routes (keep in sync with App.jsx and public/sitemap.xml)
const ROUTES = ['AboutMe', 'MyJourney', 'Projects', 'ContactMe']

// GitHub Pages only serves real files, so /Portfolio/AboutMe would 404.
// Copy index.html once per route so each URL returns 200 and can be
// indexed, plus a 404.html fallback that lets React Router show NotFound.
function spaRoutesForGithubPages() {
  let outDir
  return {
    name: 'spa-routes-for-github-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html')
      // GitHub Pages serves AboutMe.html at /AboutMe (no trailing-slash redirect)
      for (const route of ROUTES) {
        copyFileSync(index, resolve(outDir, `${route}.html`))
      }
      copyFileSync(index, resolve(outDir, '404.html'))
    },
  }
}

export default defineConfig({
  plugins: [react(), spaRoutesForGithubPages()],
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
