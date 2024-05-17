import path from 'path';
import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Inspect from 'vite-plugin-inspect'; //vue 模版生成对应js代码
import mkcert from 'vite-plugin-mkcert'; //本地启动项目，可以通过https协议
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import unpluginSm from 'unplugin-strive-molu/vite';
import { smPackage, smRoot, getPackageDependencies, pkgRoot, projRoot } from '@strive-molu/build-utils';
import './vite.init';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '');
  let { dependencies } = getPackageDependencies(smPackage);
  dependencies = dependencies.filter((dep) => !dep.startsWith('@types/')); // exclude dts deps
  return {
    plugins: [
      vue(),
      // mkcert(),
      Components({
        //自动导入ElementPlus组件，并设置生成dts文件路径
        resolvers: [ElementPlusResolver()]
      }),
      unpluginSm(), //自动导入strive-molu的样式文件
      Inspect()
    ] as any,
    resolve: {
      alias: [
        {
          find: /^strive-molu(\/(es|lib))?$/,
          replacement: path.resolve(smRoot, 'index.ts')
        },
        {
          find: /^strive-molu\/(es|lib)\/(.*)$/,
          replacement: `${pkgRoot}/$2`
        }
      ]
    },
    server: {
      host: true
    },
    // 设置预构建的包
    optimizeDeps: {
      include: ['vue', '@vue/shared', ...dependencies]
    }
  };
});
