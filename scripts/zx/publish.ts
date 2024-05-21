#!/usr/bin/env zx
import { $, question, cd, path, argv, fs, os, chalk, usePowerShell } from 'zx';
import consola from 'consola';
// 让powerShell可以运行该脚本
usePowerShell();
void (async function () {
  // 根据pnpm-lock.yaml文件中的版本安装依赖，且不会更新该文件
  consola.start('下载依赖中。。。');
  await $`pnpm i --frozen-lockfile`;

  // 更新版本号
  // await $`pnpm update:version`;
  consola.start('组件打包。。。');
  await $`pnpm build`;

  cd('dist/strive-molu');
  consola.start('发布npm包。。。');
  await $`npm publish`;
  cd('..');

  consola.success(chalk.green('发布成功！'));
})();
