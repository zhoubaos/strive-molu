#!/usr/bin/env zx

import { $, question, cd, path, argv, fs, os, chalk, usePowerShell } from 'zx';
import { consola } from 'consola';

// 让powerShell可以兼容运行该脚本
if (os.platform() === 'win32') {
  usePowerShell();
}
/**
 * @desc 本地添加 git tag 并推送到远程
 */
void (async function () {
  // 当前分支
  const curBranchName = (await $`git rev-parse --abbrev-ref HEAD`).stdout.trim();
  if (!['main', 'master'].includes(curBranchName)) {
    exitWithError('当前不是main或master分支');
  }

  //获取远程标签并处理
  consola.info('正在获取远程标签...');
  const tagsOutput = await $`git ls-remote --tags origin`;
  // 处理输出，提取并过滤标签
  const tags = tagsOutput.stdout
    .split('\n')
    .map((line) => {
      // 从每行中提取标签名（格式: <hash>	refs/tags/<tag>）
      const match = line.match(/refs\/tags\/(.*)/);
      return match ? match[1] : null;
    })
    .filter((tag): tag is string => {
      // 过滤掉null值和注解标签的指向（以^{}结尾的）
      return !!tag && !tag.endsWith('^{}');
    });

  consola.info(`最后一次标签：${getLatestTag(tags) || '无'}`);

  // 标签名称
  const tagName = await question('请输入标签名（eg：0.0.1 | 0.0.1-beta | 0.0.1-beta.1）：');
  /**
   * @example
   * 0.0.1 | 0.0.1-beta | 0.0.1-beta.1
   */
  const tagNameReg = /^\d+\.\d+\.\d+(-\w+(\.\d+)?)?$/;
  if (!tagNameReg.test(tagName)) {
    exitWithError('标签不满足规则');
  } else if (tags.includes(tagName)) {
    exitWithError('标签已经存在');
  }

  // 标签关联hash值
  const tagHash = await question(`标签关联提交的SHA值(${chalk.gray('非必须，默认最后一次提交')})：`);
  if (tagHash.length) {
    await gitHashIsExists(tagHash);
  }

  // 备注默认填充「上一 tag → 目标提交」之间的 commit 标题总结
  const endRef = tagHash.length ? tagHash : 'HEAD';
  const prevTag = getLatestTag(tags);
  const defaultRemark = await getCommitsSummary(prevTag, endRef);
  if (defaultRemark) {
    consola.info(`距上一标签 ${chalk.cyan(prevTag || '初始提交')} 的提交总结：\n${defaultRemark}`);
  }
  const remarkInput = await question(
    `标签备注信息(${chalk.gray(defaultRemark ? '回车使用上面的总结，或输入自定义内容' : '非必须')})：`
  );
  const tagRemark = remarkInput.trim() || defaultRemark;

  const tagStrategy: Record<string, any[]> = {
    t: [tagName], //只创建标签
    th: [tagName, tagHash], //创建标签，关联hash
    tr: ['-a', tagName, '-m', tagRemark], //创建标签，添加备注
    thr: ['-a', tagName, '-m', tagRemark, tagHash] //创建标签，关联hash，添加备注
  };

  const tagStrategyJudge: Record<string, () => boolean> = {
    t: () => !tagHash.length && !tagRemark.length,
    th: () => !!tagHash.length && !tagRemark.length,
    tr: () => !tagHash.length && !!tagRemark.length,
    thr: () => !!tagHash.length && !!tagRemark.length
  };

  for (const key in tagStrategyJudge) {
    if (tagStrategyJudge[key]()) {
      const tagCommand = tagStrategy[key];
      // warn：$函数后不能直接跟 $ 符号
      await $`git tag ${tagCommand}`;
      await $`git push origin ${tagName}`;
      consola.success('本地和远程标签添加成功！');
      break;
    }
  }

  // 判断输入的git hash值是否存在
  async function gitHashIsExists(hash: string) {
    try {
      await $`git rev-parse ${hash}`;
    } catch (error) {
      exitWithError(`hash值错误，请使用 ${chalk.yellow('git log --oneline')} 命令查看`);
    }
  }
})();

/**
 * 从远程 tag 列表中取出最新版本号（按 semver 比较，而不是字典序）
 */
function getLatestTag(tags: string[]) {
  const versionTags = tags.filter((tag) => /^\d+\.\d+\.\d+(-\w+(\.\d+)?)?$/.test(tag));
  versionTags.sort(compareSemverTag);
  return versionTags.at(-1);
}

/**
 * 比较两个版本 tag，返回值为正表示 a > b
 */
function compareSemverTag(a: string, b: string) {
  const parse = (tag: string) => {
    const [core, pre = ''] = tag.split('-');
    const [major, minor, patch] = core.split('.').map(Number);
    return { major, minor, patch, pre };
  };
  const pa = parse(a);
  const pb = parse(b);
  if (pa.major !== pb.major) return pa.major - pb.major;
  if (pa.minor !== pb.minor) return pa.minor - pb.minor;
  if (pa.patch !== pb.patch) return pa.patch - pb.patch;
  // 正式版大于同号的预发布版，例如 1.1.2 > 1.1.2-beta
  if (!pa.pre && pb.pre) return 1;
  if (pa.pre && !pb.pre) return -1;
  return pa.pre.localeCompare(pb.pre);
}

/**
 * 汇总上一 tag 到目标提交之间的 commit 标题，作为标签备注默认值
 * @param prevTag 上一版本标签，不存在时从仓库初始提交开始（最多 30 条）
 * @param endRef 目标提交，未指定 hash 时为 HEAD
 */
async function getCommitsSummary(prevTag: string | undefined, endRef: string) {
  const format = '- %s';
  const readLog = async (range: string[]) => {
    const result = await $`git log --no-merges --reverse --pretty=format:${format} ${range}`.quiet();
    return result.stdout.trim();
  };

  try {
    if (prevTag) {
      return await readLog([`${prevTag}..${endRef}`]);
    }
    return await readLog(['-n', '30', endRef]);
  } catch {
    // 远程 tag 可能还不在本地，先拉取该 tag 再重试一次
    if (!prevTag) {
      return '';
    }
    try {
      await $`git fetch origin tag ${prevTag} --no-tags`.quiet();
      return await readLog([`${prevTag}..${endRef}`]);
    } catch {
      return '';
    }
  }
}

// 处理错误公共函数
function exitWithError(errorMsg: unknown) {
  consola.error(chalk.red(errorMsg));
  process.exit(1);
}
