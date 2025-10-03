import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'analyze' && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ].filter(Boolean),
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        safari10: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create separate chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('plotly.js') || id.includes('react-plotly')) {
              return 'plotly';
            }
            if (id.includes('@mui')) {
              return 'mui';
            }
            if (id.includes('@reduxjs') || id.includes('redux-persist')) {
              return 'redux';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react';
            }
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    reportCompressedSize: true
  },
  resolve: {
    alias: {
      '@': './src'
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      'plotly.js-dist-min',
      'react-plotly.js',
      '@reduxjs/toolkit',
      'react-redux',
      'redux-persist',
      'react-router-dom'
    ]
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
}))
