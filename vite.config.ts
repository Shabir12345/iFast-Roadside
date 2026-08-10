import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      build: {
        // Lighthouse flags the main bundle as "missing a source map". Maps are
        // only fetched when devtools is open, so this costs real visitors
        // nothing and makes production stack traces readable.
        sourcemap: true,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
