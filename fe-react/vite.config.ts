import { fileURLToPath } from 'node:url';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

const src = fileURLToPath(new URL('./src', import.meta.url));

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
  resolve: {
    alias: {
      '~src': src,
      '~ref': fileURLToPath(new URL('./ref', import.meta.url)),
      '~stores': path.resolve(src, 'stores'),
      '~types': path.resolve(src, 'types'),
      '~routes': path.resolve(src, 'routes'),
      '~components': path.resolve(src, 'components'),
      '~hooks': path.resolve(src, 'hooks'),
      '~utils': path.resolve(src, 'utils'),
    },
  },
});
