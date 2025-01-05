import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import baseConfig from './vite.config.js'

export default defineConfig({
    ...baseConfig,
    plugins: [
        ...baseConfig.plugins,
        visualizer({
            filename: './dist/stats.html', // Guarda el reporte en dist/stats.html
            open: true,                    // Abre automáticamente el reporte en el navegador
            gzipSize: true,               // Muestra el tamaño gzip
            brotliSize: true,             // Muestra el tamaño brotli
            template: 'treemap'           // Usa el template treemap para mejor visualización
        })
    ]
})