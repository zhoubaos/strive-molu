// eslint-disable-next-line @typescript-eslint/no-var-requires
import { execSync } from 'child_process';
import fg from 'fast-glob';

// cz-git中文文档：https://cz-git.qbb.sh/zh/guide/introduction
// 获取路径下的包的目录
const getPackages = (packagePath) => fg.sync('*', { cwd: packagePath, onlyDirectories: true });

const scopes = [...getPackages('packages'), ...getPackages('internal'), 'docs', 'play', 'project', 'style', 'other'];

/**
 * @description 获取暂存区git状态
 * @example
 * [
 *  'AM .commitlintrc.js',
 *  'M  .husky/_/commit-msg',
 *  'D  commitlint.config.js',
 * ]
 */
const gitStatus = execSync('git status --porcelain || true').toString().trim().split('\n');
// 获取修改的范围 （packages/xxx）
const scopeComplete = gitStatus
  .find((r) => ~r.indexOf('M  packages'))
  ?.replace(/\//g, '%%')
  ?.match(/packages%%((\w|-)*)/)?.[1];

const subjectComplete = gitStatus
  .find((r) => ~r.indexOf('M  packages/components'))
  ?.replace(/\//g, '%%')
  ?.match(/packages%%components%%((\w|-)*)/)?.[1];

export default {
  // @see: https://commitlint.js.org/#/reference-rules
  /**
   * 规则配置
   * 数组第一项：错误级别（0:禁用该规则，1:警告，但不会阻止提交，2:错误，阻止提交）
   * 数组第二项：应用规则的条件 （always:总是应用该规则，never:从不应用）
   * 数组第三项：具体规则配置
   */
  rules: {
    /**
     * 定义提交的范围
     * type[scope]: description
     *      ^^^^^
     */
    'scope-enum': [2, 'always', scopes],
    /**
     * body前面是否需要空一行
     * type[scope]: description
     *
     * ^^^^^^^^^^ 空一行
     * - body
     */
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'], // footer前面是否需要空一行
    'type-case': [2, 'always', 'lower-case'], // 提交类型必须是小写
    /**
     * 定义提交的类型
     * type[scope]: description
     * ^^^^
     */
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'revert', 'chore']]
  },
  prompt: {
    // 配置通用的的git commit message
    alias: { fd: 'docs: 文档更新', f: 'feat: 提交代码' },
    messages: {
      type: '选择你要提交的类型:',
      scope: '选择一个提交的范围（可选）:',
      customScope: '请输入自定义提交范围：',
      subject: '填写简短的变更描述：\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行：\n',
      markBreaking: '是否有重大变化（在标题中添加“！”）（可选）：',
      confirmCommit: '是否提交或修改commit ？'
    },
    types: [
      {
        value: 'feat',
        name: 'feat:     ✨ 新增功能',
        emoji: ':sparkles:'
      },
      {
        value: 'fix',
        name: 'fix:      🐛 修复缺陷',
        emoji: ':bug:'
      },
      {
        value: 'docs',
        name: 'docs:     📝 文档更新',
        emoji: ':memo:'
      },
      {
        value: 'style',
        name: 'style:    💄 修改样式',
        emoji: ':art:'
      },
      {
        value: 'refactor',
        name: 'refactor:  ♻️ 代码重构',
        emoji: ':recycle:'
      },
      {
        value: 'perf',
        name: 'perf:      ⚡️ 优化/性能提升',
        emoji: ':zap:'
      },
      {
        value: 'test',
        name: 'test:     ✅ 增加测试用例',
        emoji: ':white_check_mark:'
      },
      {
        value: 'build',
        name: 'build:    📦️ 构建流程',
        emoji: ':package:'
      },
      {
        value: 'revert',
        name: 'revert:   ⏪️ 回退代码',
        emoji: ':rewind:'
      },
      {
        value: 'chore',
        name: 'chore:    🔨 其他修改'
      }
    ],
    useEmoji: true,
    emptyScopesAlias: '无范围',
    customScopesAlias: '自定义范围',
    defaultScope: scopeComplete, //设置默认的代码修改范围
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
    defaultSubject: subjectComplete && `[${subjectComplete}] `,
    skipQuestions: ['footer', 'breaking'], // 跳过问题
    markBreakingChangeMode: true, // 是否需要添加"!"来标记破坏性变更
    // allowBreakingChanges: ['feat', 'fix'], // 允许破坏性变更的提交类型
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false
  }
};
