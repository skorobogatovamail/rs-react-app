import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.tsx',
    server: {
      deps: {
        inline: ['next-intl', 'next'],
      },
    },
    alias: {
      'next/navigation': path.resolve(
        __dirname,
        'src/test-utils/nextNavigationMock.ts'
      ),
    },
  },
});
