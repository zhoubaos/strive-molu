import '@csstools/normalize.css';

import 'element-plus/dist/index.css';
// reset
import '../../../packages/theme/src/reset.less';
import '../../../packages/theme/src/index.less';

// 动态改变主题色
import './styles/css/rainbow.css';
import './styles/css/css-vars.css';
import './styles/index.less';

import 'virtual:uno.css';

import type { Component } from 'vue';
// 和vitepress关联的组件
import VPDemo from './components/vp-demo/index.vue';

import ApiTyping from './components/globals/vp-api-typing.vue';

export const globals: [string, Component | any][] = [
  ['Demo', VPDemo],
  ['ApiTyping', ApiTyping]
];

//
