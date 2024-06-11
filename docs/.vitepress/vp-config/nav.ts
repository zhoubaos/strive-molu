import type { NavOption } from '@/typescript/option';
// 导航配置
export const nav: NavOption[] = [
  { text: '组件', link: '/pages/component/table', activeMatch: '/component/' },
  { text: '指令', link: '/pages/directive/', activeMatch: '/directive/' },
  { text: '工具函数', link: '/pages/util/', activeMatch: '/util/' }
];
