/// <reference types="vitest" />
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  const shouldAnalyze = process.env.ANALYZE === 'true';

  return {
    plugins: [
      react({
        // React configuration
        jsxRuntime: 'automatic',
        jsxImportSource: 'react',
        babel: {
          plugins: isProduction ? [
            // Remove console.log statements in production
            ['transform-remove-console', { exclude: ['error', 'warn'] }]
          ] : []
        }
      }),
      
      // Split vendor chunks for better caching
      splitVendorChunkPlugin(),
      
      // Gzip compression for production
      isProduction && compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024, // Only compress files larger than 1KB
        deleteOriginFile: false
      }),
      
      // Brotli compression for production (better than gzip)
      isProduction && compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
        deleteOriginFile: false
      }),
      
      // Bundle analyzer (only when ANALYZE=true)
      shouldAnalyze && visualizer({
        filename: 'dist/bundle-analysis.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap' // 'treemap', 'sunburst', 'network'
      }),

      // PWA Configuration
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          cleanupOutdatedCaches: true,
          skipWaiting: true
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        manifest: {
          name: 'EcoBingle - Eco-Friendly Community',
          short_name: 'EcoBingle',
          description: 'Connect with eco-conscious individuals, discover sustainable products, and build a greener community together.',
          theme_color: '#10B981',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: 'pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png'
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        devOptions: {
          enabled: false
        }
      })
    ].filter(Boolean),

    resolve: {
      alias: {
        '@': path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          'client',
          'src'
        ),
        '@shared': path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          'shared'
        ),
        '@assets': path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          'attached_assets'
        ),
      },
    },

    root: path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'client'),

    build: {
      outDir: path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'dist/public'
      ),
      emptyOutDir: true,
      
      // Production optimizations
      minify: isProduction ? 'esbuild' : false, // esbuild is faster than terser
      target: 'es2020', // Modern browsers for smaller bundle
      cssMinify: isProduction,
      
      // Rollup options for advanced optimization
      rollupOptions: {
        output: {
          // Manual chunking for better caching
          manualChunks: {
            // Core React libraries
            'react-vendor': ['react', 'react-dom'],
            
            // UI component libraries
            'ui-vendor': [
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-popover',
              '@radix-ui/react-select',
              '@radix-ui/react-tabs',
              '@radix-ui/react-tooltip'
            ],
            
            // Form and validation libraries
            'form-vendor': [
              'react-hook-form',
              '@hookform/resolvers',
              'zod'
            ],
            
            // Utility libraries
            'utils-vendor': [
              'clsx',
              'class-variance-authority',
              'tailwind-merge'
            ],
            
            // Date and time libraries (heavy)
            'date-vendor': ['date-fns'],
            
            // Query and state management
            'query-vendor': ['@tanstack/react-query'],
            
            // Animation libraries (heavy)
            'animation-vendor': ['framer-motion'],
            
            // Chart libraries (very heavy - separate chunk)
            'chart-vendor': ['recharts'],
            
            // Icons (can be large)
            'icon-vendor': ['lucide-react', 'react-icons']
          },
          
          // Optimize chunk file names
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/').pop()?.replace(/\.[^.]+$/, '')
              : 'chunk';
            return `js/${facadeModuleId}-[hash].js`;
          },
          
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'css/[name]-[hash].css';
            }
            return 'assets/[name]-[hash].[ext]';
          },
          
          entryFileNames: 'js/[name]-[hash].js'
        },
        
        // Tree shaking configuration
        treeshake: {
          moduleSideEffects: false, // Assume no side effects for better tree shaking
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false
        }
      },
      
      // Source maps for production debugging (optional)
      sourcemap: isProduction ? 'hidden' : true,
      
      // Chunk size warnings
      chunkSizeWarningLimit: 500, // Warn if chunk is larger than 500KB
      
      // CSS code splitting
      cssCodeSplit: true,
      
      // Enable/disable chunk size warnings
      reportCompressedSize: true
    },

    // Development optimizations
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-hook-form',
        '@tanstack/react-query',
        'wouter',
        'clsx',
        'tailwind-merge'
      ],
      exclude: [
        // Large libraries that should be dynamically imported
        'recharts',
        'framer-motion',
        'date-fns'
      ]
    },

    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      },
      fs: {
        strict: true,
        deny: ['**/.*'],
      },
    },

    // CSS optimization
    css: {
      devSourcemap: command === 'serve'
    },

    // Test configuration
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./client/src/test/setup.ts'],
      css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'client/src/test/',
          '**/*.d.ts',
          '**/*.config.*',
          '**/*.stories.*',
          'dist/',
          'coverage/',
          'server/',
          'shared/'
        ],
        thresholds: {
          global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
          }
        }
      },
      include: ['client/src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
      testTimeout: 10000
    }
  };
});
