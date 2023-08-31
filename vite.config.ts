
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteMockServe({
      logger: true,
      mockPath: "./mock",
    })
  ],
  resolve: {
    alias: {
      "@":path.resolve(__dirname,'./src')
    }
  }
})
