import { postcssIsolateStyles } from 'vitepress';

export default {
  plugins: [
    postcssIsolateStyles({
      includeFiles: [/vp-doc\.css/] // 用于解决vitepress内部样式和组件样式冲突问题
    })
  ]
};
