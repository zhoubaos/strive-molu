import type { NavOption } from '../typescript/option';
// 导航配置
export const nav: NavOption[] = [
  { text: '组件', link: '/pages/component/table', activeMatch: '/component/' },
  { text: '指令', link: '/pages/directive/number-lazy', activeMatch: '/directive/' },
  { text: '工具函数', link: '/pages/util/tree-tools', activeMatch: '/util/' },
  { text: 'Fetch工具', link: '/pages/strive-molu-axios', activeMatch: '/strive-molu-axios' }
];
