import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 新增 build 配置，指定输出到 dist
  build: {
    outDir: 'dist',
    // 打包前清空旧目录，避免残留文件
    emptyOutDir: true
  }
})