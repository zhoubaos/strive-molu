import consola from 'consola';
import chalk from 'chalk';
import { errorAndExit, getWorkspacePackages } from '@strive-molu/build-utils';
import type { Project } from '@pnpm/find-workspace-packages';

async function main() {
  const tagVersion = process.env.TAG_VERSION; // 仓库打标签的版本
  const gitHead = process.env.GIT_HEAD;
  if (!tagVersion || !gitHead) {
    errorAndExit(
      new Error(
        'No tag version or git head were found, make sure that you set the environment variable $TAG_VERSION \n'
      )
    );
  }

  consola.log(chalk.cyan('开始更新版本号'));
  consola.log(chalk.cyan(`$TAG_VERSION: ${tagVersion}`));
  consola.log(chalk.cyan(`$GIT_HEAD: ${gitHead}`));

  consola.debug(chalk.yellow(`开始更新strive-molu模块package.json文件`));

  const pkgs = Object.fromEntries((await getWorkspacePackages()).map((pkg) => [pkg.manifest.name!, pkg]));
  const striveMolu = pkgs['strive-molu'];
  const eslintConfig = pkgs['@element-plus/eslint-config'];
  const metadata = pkgs['@element-plus/metadata'];

  // 重写package.json文件
  const writeVersion = async (project: Project) => {
    await project.writeProjectManifest({
      ...project.manifest,
      version: tagVersion,
      gitHead
    } as any);
  };

  try {
    await writeVersion(striveMolu);
    // await writeVersion(eslintConfig);
    // await writeVersion(metadata);
  } catch (err: any) {
    errorAndExit(err);
  }

  consola.debug(chalk.green(`$GIT_HEAD: ${gitHead}`));
  consola.success(chalk.green(`Git head updated to ${gitHead}`));
}

main();
