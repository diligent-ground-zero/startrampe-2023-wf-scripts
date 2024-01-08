import { defineConfig } from 'vite';
import esLintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    esLintPlugin({cache: false})
  ],
  server: {
    host: '0.0.0.0',
    cors: '*',
    port: '3000',
    strictPort: true,
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    }
  },
  build: {
    minify: true,
    manifest: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/scripts/main.js'),
      },
      output: {
        inlineDynamicImports: true,
        esModule: false,
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      preserveEntrySignatures: 'exports-only',
      external: ['jquery'],
    },
  },
});