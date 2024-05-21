import { series, parallel, type TaskFunction } from 'gulp';
import { withTaskName, run } from '../utils';
import { copyFile, mkdir } from 'fs/promises';
import path from 'node:path';
import { copy } from 'fs-extra';
import { buildOutput, pluginsRoot, getWorkspaceNameDirs, ensureDir } from '@strive-molu/build-utils';

/**
 * @description 复制plugins下面每个插件的dits，pacage.jso，README.md到dist目录下
 */
export const copyPlugins: TaskFunction = async () => {
  // 获取插件名称
  const pluginNameDirs = await getWorkspaceNameDirs(pluginsRoot);
  const copyName = async (name: string, dir: string) => {
    const targetDir = path.resolve(buildOutput, name);
    const sourceDir = dir;

    const targetDist = path.resolve(targetDir, 'dist');
    const sourceDist = path.resolve(sourceDir, 'dist');

    const targetPackage = path.resolve(targetDir, 'package.json');
    const sourcePackage = path.resolve(sourceDir, 'package.json');

    const targetReadme = path.resolve(targetDir, 'README.md');
    const sourceReadme = path.resolve(sourceDir, 'README.md');

    await ensureDir(targetDist);

    return withTaskName(`copyPlugins:${name}`, () =>
      Promise.all([
        copy(sourceDist, targetDist),
        copyFile(sourcePackage, targetPackage),
        copyFile(sourceReadme, targetReadme)
      ])
    );
  };

  const taskNames = await Promise.all(pluginNameDirs.map(([name, dir]) => copyName(name, dir)));

  return Promise.all(taskNames.map((task) => task()));
};

export const buildPlugins: TaskFunction = series(
  withTaskName('buildPlugins', () => run('pnpm build:plugins')), //执行打包命令
  copyPlugins
);
