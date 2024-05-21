import { rollup } from 'rollup';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros/rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import glob from 'fast-glob';
import { smRoot, excludeFiles, pkgRoot, projRoot } from '@strive-molu/build-utils';
import { generateExternal, writeBundles, withTaskName } from '../utils';
import { StriveMoluAlias } from '../plugins/strive-molu-alias';
import { buildConfigEntries, target } from '../build-info';
import Components from 'unplugin-vue-components/rollup';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import type { OutputOptions } from 'rollup';

/**
 * 构建模块
 */
export const buildModules = async () => {
  // 获取rollup 打包的入口文件
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  );
  const bundle = await rollup({
    input, //当入口文件是一个数组时，rollup会将数组中的每个文件作为一个单独的打包入口，切会被打包到单独的chunks文件中。chunks文件名称遵循entryFileNames配置
    plugins: [
      StriveMoluAlias(),
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue({
            isProduction: true
          }),
          vueJsx: vueJsx()
        }
      }),
      nodeResolve({ extensions: ['.mjs', '.js', '.json', '.ts'] }),
      // 支持导入CommonJS模块
      // 注意：该插件应该放在转换模块功能的其他创建之前，防止其他插件对 CommonJS 检测产生影响，例外是 Babel 插件，如果你使用它，请将它放在 commonjs 插件之前。
      commonjs(),
      // 处理ts,vue类型文件
      esbuild({
        sourceMap: true,
        target,
        loaders: {
          '.vue': 'ts'
        }
      }),
      Components({
        //自动导入ElementPlus组件，并设置生成dts文件路径
        dts: '../../typings/element-plus.d.ts',
        resolvers: [ElementPlusResolver()]
      })
    ] as any,
    external: await generateExternal({ full: false }),
    treeshake: false
  });
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true, //让打包输出文件保持源目录结构
        preserveModulesRoot: smRoot, //将 smRoot目录 从删除
        sourcemap: true,
        entryFileNames: ({ name }) => {
          if (name.includes('packages/')) {
            return `${name.split('packages/')[1]}.${config.ext}`;
          }
          return `${name}.${config.ext}`;
        }
      };
    })
  );
};
