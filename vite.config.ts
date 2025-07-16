import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base:'./',
  build:{
    outDir:"dist",
    sourcemap:true,
    emptyOutDir:true
  },
  plugins: [vue()],
})
