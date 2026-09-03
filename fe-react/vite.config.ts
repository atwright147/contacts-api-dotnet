import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Icons({
      autoInstall: true,
      compiler: 'jsx',
      jsx: 'react',
    }),
    react(),
  ],
});
