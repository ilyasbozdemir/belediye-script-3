import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'https://localhost:7250',
        changeOrigin: true,
        secure: false, // For self-signed certificates in dev
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    ssr: true,
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        ssr: './src/entry-server.jsx'
      }
    }
  }
})
