import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: '0.0.0.0',
    strictPort: false,
    hmr: {
      overlay: true
    },
    // 按照2文件夹的方式配置代理
    proxy: {
      '/wxhn': {
        target: 'http://www.hnswkcj.com',
        changeOrigin: true,
        secure: false,
        timeout: 30000, // 增加超时时间到30秒
        proxyTimeout: 30000, // 代理超时时间
        rewrite: (path) => path,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('proxy error:', err);
            if (!res.headersSent) {
              res.writeHead(502, {
                'Content-Type': 'text/plain',
              });
              res.end('Proxy Error: ' + err.message);
            }
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
            // 设置请求超时
            proxyReq.setTimeout(30000, () => {
              console.log('Request timeout');
              if (!res.headersSent) {
                res.writeHead(504, {
                  'Content-Type': 'text/plain',
                });
                res.end('Request Timeout');
              }
            });
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
          proxy.on('timeout', (proxyReq, req, res) => {
            console.log('Proxy timeout');
            if (!res.headersSent) {
              res.writeHead(504, {
                'Content-Type': 'text/plain',
              });
              res.end('Proxy Timeout');
            }
          });
        },
        onError: (err, req, res) => {
          console.error('Proxy error:', err);
          if (!res.headersSent) {
            res.writeHead(502, {
              'Content-Type': 'text/plain',
            });
            res.end('Proxy Error: ' + err.message);
          }
        },
      },
      '/api': {
        target: 'http://61.187.56.156',
        changeOrigin: true,
        secure: false,
        timeout: 30000,
        proxyTimeout: 30000,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('proxy error:', err);
            if (!res.headersSent) {
              res.writeHead(502, {
                'Content-Type': 'text/plain',
              });
              res.end('Proxy Error: ' + err.message);
            }
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
            // 设置请求超时
            proxyReq.setTimeout(30000, () => {
              console.log('Request timeout');
              if (!res.headersSent) {
                res.writeHead(504, {
                  'Content-Type': 'text/plain',
                });
                res.end('Request Timeout');
              }
            });
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
          proxy.on('timeout', (proxyReq, req, res) => {
            console.log('Proxy timeout');
            if (!res.headersSent) {
              res.writeHead(504, {
                'Content-Type': 'text/plain',
              });
              res.end('Proxy Timeout');
            }
          });
        },
        onError: (err, req, res) => {
          console.error('Proxy error:', err);
          if (!res.headersSent) {
            res.writeHead(502, {
              'Content-Type': 'text/plain',
            });
            res.end('Proxy Error: ' + err.message);
          }
        },
      },
      '/sjcs': {
        target: 'http://61.187.56.156',
        changeOrigin: true,
        secure: false,
        timeout: 30000,
        proxyTimeout: 30000,
        rewrite: (path) => path,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('proxy error:', err);
            if (!res.headersSent) {
              res.writeHead(502, {
                'Content-Type': 'text/plain',
              });
              res.end('Proxy Error: ' + err.message);
            }
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
            // 设置请求超时
            proxyReq.setTimeout(30000, () => {
              console.log('Request timeout');
              if (!res.headersSent) {
                res.writeHead(504, {
                  'Content-Type': 'text/plain',
                });
                res.end('Request Timeout');
              }
            });
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
          proxy.on('timeout', (proxyReq, req, res) => {
            console.log('Proxy timeout');
            if (!res.headersSent) {
              res.writeHead(504, {
                'Content-Type': 'text/plain',
              });
              res.end('Proxy Timeout');
            }
          });
        },
        onError: (err, req, res) => {
          console.error('Proxy error:', err);
          if (!res.headersSent) {
            res.writeHead(502, {
              'Content-Type': 'text/plain',
            });
            res.end('Proxy Error: ' + err.message);
          }
        },
      }
    }
  },
  preview: {
    port: 0,
    open: true,
    host: true,
    strictPort: false
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  optimizeDeps: {
    include: ['file-saver', 'jszip']
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
})