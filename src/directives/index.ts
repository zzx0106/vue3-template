import { App } from 'vue';

// vite的ts查找，相当于webpack的require.context('./', true, /\.ts$/);
const modules = import.meta.globEager('./**/*.ts');
export default function initDirectives(app: App) {
  console.log('modules', modules);
  Object.keys(modules).forEach((key) => {
    const model = modules[key].default || (() => {});
    console.log('注入指令: ', key);
    model(app);
  });
}
// // 获取当前目录下的所有自定义指令
// const modules = require.context('./', true, /\.ts$/);
// export default function initDirectives(app: App) {
//   const ids = modules.keys().filter((id) => id !== './index.ts'); // 过滤掉当前的index.ts，防止无线调用
//   ids.forEach((id) => {
//     const module = modules(id);
//     const callback = module.default;
//     console.log('加载全局directive', id);
//     callback(app);
//   });
// }
