import { loadEnv, PluginOption } from 'vite';
import path from 'path';
import glob from 'fast-glob';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import mkcert from 'vite-plugin-mkcert';
import { docPackage, smPackage, getPackageDependencies, projRoot } from '@strive-molu/build-utils';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { MarkdownTransform } from '../plugins/markdown-transform';
import type { Plugin, UserConfig } from 'vitepress';
import chalk from 'chalk';

type ViteConfig = Required<UserConfig>['vite'];
type ResolveOptions = Required<ViteConfig>['resolve'];
type AliasOptions = Required<ResolveOptions>['alias'];

const { dependencies: epDeps } = getPackageDependencies(smPackage);
const { dependencies: docsDeps } = getPackageDependencies(docPackage);
const optimizeDeps = [...new Set([...epDeps, ...docsDeps])].filter(
  (dep) => !dep.startsWith('@types/') && !['strive-nolu', 'element-plus', 'normalize.css'].includes(dep)
);

optimizeDeps.push(
  ...(await glob(['dayjs/plugin/*.js'], {
    cwd: path.resolve(projRoot, 'node_modules'),
    onlyFiles: true
  }))
);

const alias: AliasOptions = [
  {
    find: '@/',
    replacement: `${path.resolve(__dirname, '../../.vitepress')}/`
  },
  {
    find: '~/',
    replacement: `${path.resolve(__dirname, '../vitepress')}/`
  },
  ...(process.env.DOC_ENV === 'production'
    ? []
    : [
        {
          find: /^strive-molu(\/(es|lib))?$/,
          replacement: path.resolve(projRoot, 'packages/strive-molu/index.ts')
        },
        {
          find: /^strive-molu\/(es|lib)\/(.*)$/,
          replacement: `${path.resolve(projRoot, 'packages')}/$2`
        }
      ])
];

export const getViteConfig = ({ mode }): ViteConfig => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api']
        }
      }
    },
    server: {
      host: true,
      open: true,
      fs: {
        allow: [projRoot]
      },
      port: 5001
    },
    resolve: {
      alias
    },
    ssr: {
      noExternal: ['vue/server-renderer']
    },
    plugins: [
      Components({
        dirs: ['.vitepress/vitepress/components'],
        resolvers: [
          // ElementPlusResolver(),
          // auto import icons
          // https://github.com/antfu/unplugin-icons
          IconsResolver()
        ],
        allowOverrides: true,
        include: [/\.vue$/, /\.vue\?vue/]
      }),
      Icons(),
      MarkdownTransform()
      // mkcert({
      //   source: 'coding'
      // })
    ] as any,
    optimizeDeps: {
      include: optimizeDeps
    }
  };
};
