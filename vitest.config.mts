import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros/vite';

export default defineConfig({
  plugins: [
    VueMacros({
      setupComponent: false,
      setupSFC: false,
      plugins: {
        vue: Vue(),
        vueJsx: VueJsx()
      }
    })
  ],
  optimizeDeps: {
    disabled: true
  },
  test: {
    clearMocks: true,
    environment: 'jsdom', // 设置测试环境
    setupFiles: ['./vitest.setup.ts'], // setup 文件的路径。它们将运行在每个测试文件之前。
    reporters: ['default'],
    testTransformMode: {
      web: ['*.{ts,tsx}']
    },
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      exclude: [
        'play/**',
        // 'packages/locale/lang/**',
        'packages/components/*/style/**'
      ]
    }
  }
});
