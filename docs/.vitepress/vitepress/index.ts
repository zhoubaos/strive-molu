//  统一不同浏览器的默认样式
import 'normalize.css';

// element-plus
import 'element-plus/dist/index.css';
// reset
import '../../../packages/theme/src/reset.scss';
import '../../../packages/theme/src/index.scss';

// 动态改变主题色
import './styles/custom-theme/index.scss';
import './styles/app.scss';

import 'virtual:uno.css';

import { type Component } from 'vue';

// 和vitepress关联的组件
import VPDemo from './components/vp-demo/index.vue';

import ApiTyping from './components/globals/vp-api-typing.vue';

export const globals: [string, Component | any][] = [
  ['Demo', VPDemo],
  ['ApiTyping', ApiTyping]
];
