#!/usr/bin/env zx
import { $, question, cd, path, argv, fs, os, chalk, usePowerShell } from 'zx';
import consola from 'consola';

// 让powerShell可以兼容运行该脚本
if (os.platform() === 'win32') {
  usePowerShell();
}
void (async function () {
  // 根据pnpm-lock.yaml文件中的版本安装依赖，且锁定该文件
  // consola.start('下载依赖中。。。');
  // await $`pnpm i --frozen-lockfile`;

  try {
    // 更新版本号

    await $`pnpm update:version`;
    consola.success(chalk.green('更新组件版本号完成'));
    await $`pnpm build`;
    consola.success(chalk.green('组件打包完成'));

    cd('dist/strive-molu');
    await $`npm publish --provenance`;
    cd('..');

    consola.success(chalk.green('发布成功！'));
  } catch (error) {
    exitWithError(error);
  }
})();

// 处理错误公共函数
function exitWithError(errorMsg: unknown) {
  consola.error(chalk.red(errorMsg));
  process.exit(1);
}
