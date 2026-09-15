#!/usr/bin/env zx
import { $, question, os, chalk, usePowerShell, argv } from 'zx';
import { consola } from 'consola';

// 让 powerShell 可以兼容运行该脚本
if (os.platform() === 'win32') {
  usePowerShell();
}

/**
 * @desc 基于已推送的 git tag，通过 GitHub CLI 创建 Release，从而触发 npm 发布工作流
 * @example
 * pnpm gen:release
 * pnpm gen:release -- --tag 0.0.1
 * pnpm gen:release -- --tag 0.0.1 --notes "发布说明"
 * pnpm gen:release -- --tag 0.0.1-beta --generate-notes
 */
void (async function () {
  await ensureGhReady();

  // 拉取远程 tag，用于校验 Release 必须对应已存在的标签
  consola.info('正在获取远程标签...');
  const tags = await getRemoteTags();
  consola.info(`最后一次标签：${tags.at(-1)}`);

  // 优先使用命令行参数，便于 tag 脚本直接调用；否则进入交互输入
  const tagName = await resolveTagName(tags);
  const tagRemark = await resolveTagRemark();

  await createGitHubRelease(tagName, tagRemark);
})();

/**
 * 解析要发布的 tag：命令行 --tag / 位置参数优先，否则交互输入
 */
async function resolveTagName(tags: string[]) {
  const tagNameReg = /^\d+\.\d+\.\d+(-\w+(\.\d+)?)?$/;
  // tsx 执行时 argv._ 可能含脚本路径，只取符合版本规则的位置参数
  const positionalTag = (argv._ as Array<string | number>).map(String).find((item) => tagNameReg.test(item));
  const tagFromArgv = typeof argv.tag === 'string' ? argv.tag : positionalTag;
  const tagName = (tagFromArgv || (await question('请输入要创建 Release 的标签名：'))).trim();

  if (!tagNameReg.test(tagName)) {
    exitWithError('标签不满足规则，示例：0.0.1 | 0.0.1-beta | 0.0.1-beta.1');
  }
  if (!tags.includes(tagName)) {
    exitWithError(`远程不存在标签 ${tagName}，请先执行 pnpm gen:tag`);
  }

  return tagName;
}

/**
 * 解析 Release notes：
 * --notes 有值则直接使用；
 * --generate-notes 或 --notes 为空则交给 GitHub 自动生成；
 * 都未传时交互询问
 */
async function resolveTagRemark() {
  if (typeof argv.notes === 'string') {
    return argv.notes;
  }
  // tag 脚本未填写备注时会带上 --generate-notes，跳过二次询问
  if (argv['generate-notes'] === true) {
    return '';
  }

  return (await question(`Release 备注信息(${chalk.gray('非必须，回车则自动生成')})：`)).trim();
}

/**
 * 获取远程已有 tag 列表（过滤注解 tag 的 ^{} 指向）
 */
async function getRemoteTags() {
  const tagsOutput = await $`git ls-remote --tags origin`;
  return tagsOutput.stdout
    .split('\n')
    .map((line) => {
      const match = line.match(/refs\/tags\/(.*)/);
      return match ? match[1] : null;
    })
    .filter((tag): tag is string => {
      return !!tag && !tag.endsWith('^{}');
    });
}

/**
 * 检查本机已安装 GitHub CLI，并且已登录
 */
async function ensureGhReady() {
  try {
    // 探测 gh 是否可用，不向终端打印版本信息
    await $`gh --version`.quiet();
  } catch {
    exitWithError('未安装 GitHub CLI（gh）。安装见 https://cli.github.com/ ，安装后执行 gh auth login');
  }

  try {
    await $`gh auth status`;
  } catch {
    exitWithError('GitHub CLI 未登录，请先执行 gh auth login');
  }
}

/**
 * 基于已推送的 tag 创建 GitHub Release
 * @param tagName 标签名，同时作为 Release 标题
 * @param tagRemark 备注；有值时作为 Release notes，否则让 GitHub 根据提交记录自动生成
 */
async function createGitHubRelease(tagName: string, tagRemark: string) {
  // 带预发布后缀的 tag（如 0.0.1-beta）标记为 prerelease
  const isPrerelease = tagName.includes('-');
  const args = [tagName, '--title', tagName];

  if (isPrerelease) {
    args.push('--prerelease');
  }

  if (tagRemark.length) {
    args.push('--notes', tagRemark);
  } else {
    args.push('--generate-notes');
  }

  await $`gh release create ${args}`;
  consola.success(chalk.green(`GitHub Release ${tagName} 创建成功，已触发 npm 发布工作流`));
}

// 处理错误公共函数
function exitWithError(errorMsg: unknown) {
  consola.error(chalk.red(errorMsg));
  process.exit(1);
}
