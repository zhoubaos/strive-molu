import { defineConfig } from 'vitepress';
import { nav, sidebar, mdPlugin } from './vp-config';
import { docsDirName } from '@strive-molu/build-utils';
import { REPO_BRANCH, REPO_PATH } from '@strive-molu/build-constants';
import { homedir } from 'os';
import { text } from 'stream/consumers';

export default defineConfig({
  title: 'strive-molu',
  description: '组件，指令，插件，工具函数等等',
  appearance: false, //关闭主题切换
  themeConfig: {
    // repo: REPO_PATH, // git仓库路径
    // docsBranch: REPO_BRANCH,
    // docsDir: docsDirName,

    lastUpdated: {
      text: '最近更新'
    },
    outline: {
      level: 'deep',
      label: '内容'
    },
    logo: '/logo.png', // logo
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/zhoubaos/strive-molu'
      }
    ],
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    nav: nav as any,
    sidebar
  },
  markdown: {
    config: (md) => mdPlugin(md as any)
  }
});
