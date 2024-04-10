import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { version as pkgVersion } from './package.json'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
if (process.env.NODE_ENV === 'production') {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString()
}

export default defineConfig({
  // base: process.env.NODE_ENV === 'production' ? 'https://3dconvert.nsdt.cloud/convert/mytools' :"./", //  绝对url路径
  base: process.env.NODE_ENV === 'production' ? 'https://3dconvert.nsdt.cloud/convert/mytools' :"./", //  绝对url路径
  server:{
    port: 5175
  },
  
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        'pinia',
        {
          '@/store': ['useStore'],
          '@vueuse/head': ['useHead'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      resolvers: [AntDesignVueResolver()]

      // dts: 'src/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
