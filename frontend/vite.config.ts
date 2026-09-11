import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      scope: '/join',
      manifest: false,
      strategies: 'generateSW',
      workbox: {
        navigateFallback: '/join',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@shared': resolve(__dirname, './src/shared'),
      '@entities': resolve(__dirname, './src/entities'),
      '@features': resolve(__dirname, './src/features'),
      '@widgets': resolve(__dirname, './src/widgets'),
      '@pages': resolve(__dirname, './src/pages'),
      '@app': resolve(__dirname, './src/app'),
      '@pairly/schemas': resolve(__dirname, '../backend/src/schemas/index.ts'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/socket.io')) {
            return 'vendor-socket';
          }
          if (
            id.includes('framer-motion') &&
            (id.includes('AnimatePresence') || id.includes('LayoutGroup'))
          ) {
            return 'presenter-motion-layout';
          }
          if (id.includes('framer-motion')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules/d3') || id.includes('node_modules/d3-')) {
            return 'presenter-d3';
          }
        },
      },
    },
  },
});
