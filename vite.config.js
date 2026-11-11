import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import kalaApiHandler from './api/kala.js'

function kalaServerPlugin() {
  const attachMiddleware = (middlewares) => {
    middlewares.use((req, res, next) => {
      const urlPath = (req.url || '').split('?')[0]
      if (urlPath === '/api/kala' || urlPath === '/kalachakra/api/kala') {
        return kalaApiHandler(req, res)
      }
      next()
    })
  }

  return {
    name: 'kalachakra-kala-api-server',
    configureServer(server) {
      attachMiddleware(server.middlewares)
    },
    configurePreviewServer(server) {
      attachMiddleware(server.middlewares)
    }
  }
}

export default defineConfig(({ mode }) => {
  // Load server-side environment variables (including GEMINI_API_KEY) into Node process.env
  // without exposing non-VITE_ variables to the frontend client bundle.
  const env = loadEnv(mode, process.cwd(), '')
  if (env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY
  }

  return {
    base: process.env.NODE_ENV === 'production' ? '/kalachakra/' : '/',
    plugins: [
      kalaServerPlugin(),
      tailwindcss(),
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'icons.svg'],
        manifest: {
          name: 'KALACHAKRA - AI-Powered Civilization & Heritage Game',
          short_name: 'KALACHAKRA',
          description: 'Play the Past. Build the Future.',
          theme_color: '#121212',
          background_color: '#121212',
          display: 'standalone',
          start_url: process.env.NODE_ENV === 'production' ? '/kalachakra/' : '/',
          icons: [
            {
              src: 'favicon.svg',
              sizes: '192x192',
              type: 'image/svg+xml'
            },
            {
              src: 'favicon.svg',
              sizes: '512x512',
              type: 'image/svg+xml'
            },
            {
              src: 'favicon.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
          navigateFallbackDenylist: [/^\/api\//, /^\/kalachakra\/api\//],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      })
    ]
  }
})
