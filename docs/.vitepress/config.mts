import { UserConfig } from 'vitepress';
import { nav, sidebar, mdPlugin } from './vp-config';
import { docsDirName } from '@strive-molu/build-utils';
import { REPO_BRANCH, REPO_PATH } from '@strive-molu/build-constants';
import { homedir } from 'os';
import { text } from 'stream/consumers';

export const config: UserConfig = {
  title: 'strive-molu',
  description: '组件，指令，插件，工具函数等等',

  themeConfig: {
    // repo: REPO_PATH, // git仓库路径
    // docsBranch: REPO_BRANCH,
    // docsDir: docsDirName,
    lastUpdated: {
      text: '最近更新'
    },
    logo: '/logo.png', // logo
    nav,
    sidebar
  },
  markdown: {
    config: (md) => mdPlugin(md as any)
  }
};
export default config;
