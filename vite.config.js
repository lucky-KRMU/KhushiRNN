import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets use relative paths for GitHub Pages
  server: {
    port: 5173,
    host: true,
  },
});

