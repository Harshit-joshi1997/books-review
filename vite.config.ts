// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, // ensures process.env is defined at runtime
  },
  server: {
    proxy: {
      // Proxy API requests for /book, /login, and /sign-up to the backend server
      '^/(book|login|sign-up)': {
        target: 'http://localhost:8000', // your backend
        changeOrigin: true,
      },
    },
  },
});
