import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('@google/genai')) return 'vendor-genai';
          if (id.includes('@supabase')) return 'vendor-supabase';
          if (id.includes('lucide-react') || id.includes('animejs') || id.includes('canvas-confetti')) {
            return 'vendor-ui';
          }
        },
      },
    },
  },
  server: {
    host: true, // Listen on all local IPs
    allowedHosts: true, // Allow localtunnel, ngrok, and all tunnel hosts
  },
});
