import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/backend': {
        target: 'https://art-sw2025-be.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, '')
      },
      '/api': {
        target: 'https://art-sw2025-be.vercel.app',
        changeOrigin: true,
        secure: false
      },
      
    }
  }
})