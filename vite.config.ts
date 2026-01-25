import { fileURLToPath, URL } from 'node:url'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import Vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import AutoComponents from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { pagefind } from 'vite-plugin-pagefind'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Pages({
      dirs: 'src/pages',
      extensions: ['vue', 'md'],
      importMode: 'async',
    }),
    Markdown({
      wrapperComponent: 'MD_Context',
      headEnabled: true,
    }),
    VueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: true,
    }),
    AutoComponents({
      dirs: ['src/components'], // 自动导入的组件目录
      dts: 'src/components.d.ts', // 生成类型声明文件
    }),
    ViteYaml(),
    pagefind({
      outputDirectory: 'dist',
      assetsDirectory: 'public',
      bundleDirectory: 'pagefind',
      buildScript: 'build',
      developStrategy: 'lazy',
    }),
  ],
  build: {
    // Assets below this size will be loaded inline in the HTML
    assetsInlineLimit: 16384, // 16kb
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssr: {
    noExternal: ['oh-vue-icons'],
  },
})
