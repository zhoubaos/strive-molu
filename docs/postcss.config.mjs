import { postcssIsolateStyles } from 'vitepress';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import postcssImport from 'postcss-import';
export default {
  plugins: [
    postcssIsolateStyles({
      includeFiles: [/vp-doc\.css/] // 用于解决vitepress内部样式和组件样式冲突问题
    }),
    postcssImport({}),
    tailwindcss({}),
    autoprefixer({})
  ]
};
