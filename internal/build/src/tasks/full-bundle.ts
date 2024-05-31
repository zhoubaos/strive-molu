import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import vue from '@vitejs/plugin-vue';
import VueMacros from 'unplugin-vue-macros/rollup';
// import vueJsx from '@vitejs/plugin-vue-jsx';
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild';
import { parallel } from 'gulp';
import glob from 'fast-glob';
import { PKG_BRAND_NAME, PKG_CAMELCASE_LOCAL_NAME, PKG_CAMELCASE_NAME } from '@strive-molu/build-constants';
import { smOutput, smRoot } from '@strive-molu/build-utils';
import { version } from '../../../../packages/strive-molu/version';
import { StriveMoluAlias } from '../plugins/strive-molu-alias';
import { formatBundleFilename, generateExternal, withTaskName, writeBundles } from '../utils';
import { target } from '../build-info';
import type { TaskFunction } from 'gulp';
import type { Plugin } from 'rollup';

const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`;

/**
 * 全量打包函数，只会生成
 * @param minify
 */
async function buildFullEntry(minify: boolean) {
  const plugins: Plugin[] | any = [
    StriveMoluAlias(),
    VueMacros({
      setupComponent: false,
      setupSFC: false,
      plugins: {
        vue: vue({
          isProduction: true
        })
      }
    }),
    // 让rollup可以有Node模块的解析功能
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts']
    }),
    // 让rollup可以支持导入的commonjs模块
    commonjs(),
    // 用于转换ts/esnext代码
    esbuild({
      exclude: [],
      sourceMap: minify,
      target,
      loaders: {
        '.vue': 'ts' // 配置对应 .vue 文件使用 ts-loader进行解析
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('production') // 设置全局变量值
      },
      treeShaking: true,
      legalComments: 'eof' //处理打包后的代码注释 eof: 保留最后一个注释
    })
  ];
  if (minify) {
    plugins.push(
      minifyPlugin({
        target,
        sourceMap: true
      })
    );
  }

  const bundle = await rollup({
    input: path.resolve(smRoot, 'index.ts'),
    plugins,
    external: await generateExternal({ full: true }),
    treeshake: true
  });

  // 根据不同配置在文件系统中写入打包后的文件
  await writeBundles(bundle, [
    {
      format: 'umd', //生成的bundle格式
      file: path.resolve(smOutput, 'dist', formatBundleFilename('index.full', minify, 'js')), // 设置指定打包后的文件名，只能在生成chunk不超过一个的情况下使用
      exports: 'named', //设置导入
      name: PKG_CAMELCASE_NAME, // 设置在iife/umd模式中使用这个变量名来方法bundle的输出
      globals: {
        vue: 'vue' //在umd/iife模式下对使用的第是否依赖的全局变量
      },
      sourcemap: minify,
      banner // 在打包的代码前添加的额外代码
    },
    {
      format: 'esm',
      file: path.resolve(smOutput, 'dist', formatBundleFilename('index.full', minify, 'mjs')),
      sourcemap: minify,
      banner
    }
  ]);
}

export const buildFull = (minify: boolean) => async () => Promise.all([buildFullEntry(minify)]);

export const buildFullBundle: TaskFunction = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false))
);
