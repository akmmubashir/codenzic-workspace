import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/pwa-icon.png'],
      manifest: {
        name: 'Codenzic Workspace',
        short_name: 'Codenzic',
        description: 'A unified workspace for teams.',
        start_url: '/',
        display: 'standalone',
        background_color: '#f8fafc',
        theme_color: '#1e3a8a',
        icons: [
          { src: 'assets/pwa-icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'assets/pwa-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        ],
      },
    }),
  ],
});
