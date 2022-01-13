/*
 * @Author: your name
 * @Date: 2021-05-31 09:56:42
 * @LastEditTime: 2021-06-02 14:38:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \phoenix-platform-pc1\vite.config.ts
 */
import { defineConfig } from 'vite';
import fs from 'fs';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
const join = path.join;

const fileNames = findSync('./src/assets/global'); // 拿到global里面的所有文件路径
const cssGlobal = fileNames.map((filename) => `@import "${filename}";`.replace(/\\/g, '/')).join('');
console.log('cssGlobal', cssGlobal);

// https://vitejs.dev/config/
export default defineConfig({
  // esbuild: {
  //   // jsxInject: "import { h } from 'vue';",
  //   jsxFactory: 'h',
  //   jsxFragment: 'Fragment',
  // },
  server: {
    port: 10078,
  },
  plugins: [vue(), vueJsx()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: cssGlobal,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
function findSync(startPath) {
  let result = [];
  function finder(path) {
    let files = fs.readdirSync(path);
    files.forEach((val) => {
      let fPath = join(path, val);
      let stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) {
        if (fPath.indexOf('.md') === -1) {
          result.push(fPath);
        }
      }
    });
  }
  finder(startPath);
  return result;
}
