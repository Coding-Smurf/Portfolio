import { defineConfig, createServer } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE_URL = 'https://coding-smurf.github.io/Portfolio'

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Sets the <head> metadata of one page: the same values <Seo> sets in the browser
function withHead(html, page) {
  if (!page.seo) return html // Landing keeps the defaults of index.html
  const title = escapeHtml(`Adrián Ortiz Ramírez | ${page.seo.title}`)
  let out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
  if (page.seo.description) {
    const description = escapeHtml(page.seo.description)
    out = out
      .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${description}`)
  }
  if (page.path === null) {
    // 404: no canonical URL, and keep it out of search results
    return out
      .replace(/\s*<link rel="canonical"[^>]*>/, '')
      .replace('</title>', '</title>\n    <meta name="robots" content="noindex" />')
  }
  const url = `${SITE_URL}/${page.path}`
  return out
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
}

// GitHub Pages only serves real files, so /Portfolio/AboutMe would 404, and the pages
// are rendered with JavaScript, so bots that do not run it would see an empty page.
// After the build, write one HTML file per route (AboutMe.html is served at /AboutMe)
// with its own <head> metadata and its content as static HTML inside #root, plus a
// 404.html fallback that lets React Router show NotFound. The content comes from
// src/prerender/render.jsx, loaded through Vite so it can import the same JSON and data
// modules as the app. React replaces it when the app starts.
function prerenderRoutes() {
  let config
  return {
    name: 'prerender-routes',
    apply: 'build',
    configResolved(resolved) {
      config = resolved
    },
    async closeBundle() {
      const outDir = resolve(config.root, config.build.outDir)
      const template = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      const marker = /<!--prerender:start-->[\s\S]*?<!--prerender:end-->/
      if (!marker.test(template)) throw new Error('prerender: markers not found in index.html')

      const server = await createServer({
        configFile: false,
        root: config.root,
        base: config.base,
        plugins: [react()],
        logLevel: 'error',
        appType: 'custom',
        // only used to load one module: skip scanning and pre-bundling dependencies
        optimizeDeps: { noDiscovery: true, include: [] },
        server: { middlewareMode: true, hmr: false, watch: null },
      })
      try {
        const { PAGES, renderPage } = await server.ssrLoadModule('/src/prerender/render.jsx')
        for (const page of PAGES) {
          const body = `<!--prerender:start-->${renderPage(page)}<!--prerender:end-->`
          writeFileSync(resolve(outDir, page.file), withHead(template, page).replace(marker, () => body))
        }
      } finally {
        await server.close()
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), prerenderRoutes()],
  // El repositorio se publica como proyecto de GitHub Pages en /Portfolio/.
  base: '/Portfolio/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
})
