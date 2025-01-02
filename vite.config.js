import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ciber-dev/', // Añadimos esta línea para GitHub Pages
})