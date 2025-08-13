import type { UserConfig } from 'vitepress';
import { getViteConfig } from './vite';
import { nav } from './nav';
import { sidebar } from './sidebars';
import { mdPlugin } from './plugin';
import { vueCompiler } from './vue-compiler';
const setupConfig = (configEnv) => {
  const config: UserConfig<any> = {
    title: 'strive-molu',
    description: '组件，指令，插件，工具函数等等',
    appearance: false,
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
      nav,
      sidebar
    },
    outDir: './build/dist',
    vite: getViteConfig(configEnv),
    markdown: {
      config: (md) => mdPlugin(md)
    },
    vue: {
      compiler: vueCompiler
    }
  };

  return config;
};

export default setupConfig;
