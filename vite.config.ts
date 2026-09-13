import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'node:fs';
import { defineConfig, type Plugin } from 'vite';

function adminRoute(): Plugin {
  return {
    name: 'admin-route',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/admin' || req.url === '/admin/') {
          const adminFile = path.resolve(
            process.cwd(),
            'public/admin/index.html'
          );

          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(fs.readFileSync(adminFile, 'utf-8'));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => ({
  plugins: [
    adminRoute(),
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },

  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
    allowedHosts: ['.loca.lt'],
  },
}));