import path from 'path';
import { copyFile, mkdir } from 'fs/promises';
import { copy } from 'fs-extra'; //提供比原生‘fs’模块更多功能
import { parallel, series } from 'gulp';
import { buildOutput, smOutput, smPackage, projRoot } from '@strive-molu/build-utils';
import { buildConfig, run, runTask, withTaskName } from './src';
import type { TaskFunction } from 'gulp';
import type { Module } from './src';

// 拷贝 strive-molu/packages/strive-molu 目录下的指定文件到 dist/strive-molu 目录下
export const copyFiles = () =>
  Promise.all([
    copyFile(smPackage, path.join(smOutput, 'package.json')),
    copyFile(path.resolve(projRoot, 'README.md'), path.resolve(smOutput, 'README.md')),
    copyFile(path.resolve(projRoot, 'global.d.ts'), path.resolve(smOutput, 'global.d.ts'))
  ]);
// 拷贝 dist/types/packages 目录下的文件到 dist/esm 和 dist/cjs 目录下
export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types', 'packages');
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () => copy(src, buildConfig[module].output.path));

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done);
};
/**
 * 拷贝全量css样式
 */
export const copyFullStyle = async () => {
  await mkdir(path.resolve(smOutput, 'dist'), { recursive: true });
  await copyFile(path.resolve(smOutput, 'theme/index.css'), path.resolve(smOutput, 'dist/index.css'));
};

/**
 * series方法和parallel都可以用于组合任务，他们之间可以进行嵌套至任意深度。
 * series方法是让包裹的任务串行执行。
 * parallel是让任务并行执行。
 */
export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(smOutput, { recursive: true })),
  parallel(
    runTask('buildModules'), // 构建单模块
    runTask('buildFullBundle'), //构建全量包
    runTask('generateTypesDefinitions'), // 生成ts类型定义
    series(
      withTaskName('buildTheme', () => run('pnpm run -C packages/theme build')), //打包组件样式文件
      copyFullStyle //拷贝全量css样式
    ),
    runTask('buildPlugins') //构建插件
  ),
  parallel(copyFiles, copyTypesDefinitions) //复制package.json文件和ts类型定义文件
);

export * from './src';
