import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Static dosyalar için yapılandırma
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    // Static dosyaları kopyala
    copyPublicDir: true,
  },
});
