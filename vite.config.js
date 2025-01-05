import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    process.env.ANALYZE === 'true' && visualizer({
      filename: './dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    })
  ].filter(Boolean),
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
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@headlessui/react', '@iconify/react', 'lucide-react'],
          'animation-vendor': ['framer-motion'],
          'email-vendor': ['@emailjs/browser']
        }
      }
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1500
  },
  optimizeDeps: {
    exclude: ['@emailjs/browser'] // Excluye dependencias problemáticas
  }
})