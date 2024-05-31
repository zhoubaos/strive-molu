import { defineConfig, loadEnv, type ConfigEnv, type UserConfig, type Alias } from 'vite';
import path from 'path';
import glob from 'fast-glob';
import Components from 'unplugin-vue-components/vite';
import mkcert from 'vite-plugin-mkcert';
import { docPackage, smPackage, getPackageDependencies, projRoot } from '@strive-molu/build-utils';
import UnoCSS from 'unocss/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform';
const alias: Alias[] = [
  {
    find: '@/',
    replacement: `${path.resolve(__dirname, './.vitepress')}/`
  },
  {
    find: '~/',
    replacement: `${path.resolve(__dirname, './.vitepress/vitepress')}/`
  }
];

if (process.env.DOC_ENV !== 'production') {
  alias.push(
    {
      find: /^strive-molu(\/(es|lib))?$/,
      replacement: path.resolve(projRoot, 'packages/strive-molu/index.ts')
    },
    {
      find: /^strive-molu\/(es|lib)\/(.*)$/,
      replacement: `${path.resolve(projRoot, 'packages')}/$2`
    }
  );
}

export default defineConfig(async ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '');

  const { dependencies: epDeps } = getPackageDependencies(smPackage);
  const { dependencies: docsDeps } = getPackageDependencies(docPackage);

  const optimizeDeps = [...new Set([...epDeps, ...docsDeps])].filter(
    (dep) => !dep.startsWith('@types/') && !['strive-nolu', 'element-plus'].includes(dep)
  );

  optimizeDeps.push(
    ...(await glob(['dayjs/plugin/*.js'], {
      cwd: path.resolve(projRoot, 'node_modules'),
      onlyFiles: true
    }))
  );

  return {
    server: {
      host: true,
      fs: {
        allow: [projRoot]
      }
    },
    resolve: {
      alias
    },
    plugins: [
      Components({
        dirs: ['.vitepress/vitepress/components'],
        resolvers: [
          // auto import icons
          // https://github.com/antfu/unplugin-icons

          IconsResolver()
        ],
        allowOverrides: true,
        include: [/\.vue$/, /\.vue\?vue/]
      }),
      Icons(),
      UnoCSS() as any,
      MarkdownTransform()
      // mkcert({
      //   source: 'coding'
      // })
    ],
    optimizeDeps: {
      include: optimizeDeps
    }
  };
});
