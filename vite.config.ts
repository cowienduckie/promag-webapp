import http from 'https';
import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 3000,
      https: true,
      proxy: {
        '/authority': {
          target: env.VITE_IDENTITY_URL || 'http://127.0.0.1:5101',
          changeOrigin: true,
          secure: false,
          agent: new http.Agent(),
          rewrite: (path) => path.replace(/^\/authority/, '')
        },
        '/graphql': {
          target: env.VITE_GRAPHQL_URL || 'http://127.0.0.1:5100/graphql',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/graphql/, '')
        },
        '/web-apigw': {
          target: env.VITE_WEB_APIGW_URL || 'http://127.0.0.1:5103',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/web-apigw/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [react()]
  };
});
