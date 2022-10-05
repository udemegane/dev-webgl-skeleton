import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  root: 'hw7_template',
  plugins: [
        viteSingleFile(),
        glsl()
  ],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
  }
})
