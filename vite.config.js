import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy vendor libraries into separate cached chunks
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-animation': ['gsap', 'framer-motion'],
          'vendor-router': ['react-router-dom'],
          'vendor-react': ['react', 'react-dom'],
        },
      },
    },
    // Target modern browsers for smaller output
    target: ['es2020', 'safari14'],
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})
