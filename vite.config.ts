import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-folio/',
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          tags: {
            'v-img': ['src'],
            'v-carousel': ['src'],
            'v-carousel-item': ['src'],
            video: ["src", "poster"],
            source: ["src"],
            img: ["src"],
            image: ["xlink:href", "href"],
            use: ["xlink:href", "href"],
          }
        }
      }
    }),
  ],
  server: {
    host: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
