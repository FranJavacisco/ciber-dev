import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self' panchodev.site;
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.panchodev.site https://*.githubusercontent.com;
        style-src 'self' 'unsafe-inline' https://*.panchodev.site;
        img-src 'self' data: https: https://*.panchodev.site https://*.githubusercontent.com;
        connect-src 'self' https://api.github.com https://*.panchodev.site https://*.githubusercontent.com wss: ws:;
        font-src 'self' data: https://fonts.gstatic.com;
        manifest-src 'self';
        form-action 'self';
        frame-ancestors 'none';
        base-uri 'self';
        object-src 'none'
      `.replace(/\s{2,}/g, ' ').trim()
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Asegura que los assets tengan nombres consistentes
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      }
    }
  }
})