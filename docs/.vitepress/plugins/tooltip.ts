import type { MarkdownRenderer } from 'vitepress';

export default (md: MarkdownRenderer): void => {
  md.renderer.rules.tooltip = (tokens, idx) => {
    const token = tokens[idx];

    return `<api-typing type="${token.content}" details="${token.info}" />`;
  };

  // 定义如何从 markdown 文本中提取tooltip语法
  md.inline.ruler.before('emphasis', 'tooltip', (state, silent) => {
    // 匹配格式为： ^[内容]`详情` 的正则表达式
    const tooltipRegExp = /^\^\[([^\]]*)\](`[^`]*`)?/;
    const str = state.src.slice(state.pos, state.posMax);

    if (!tooltipRegExp.test(str)) return false;
    // 寂寞模式直接返回true
    if (silent) return true;

    const result = str.match(tooltipRegExp);

    if (!result) return false;

    // 创建新的token并设置其属性
    const token = state.push('tooltip', 'tooltip', 0);
    // 设置内容属性
    token.content = result[1].replace(/\\\|/g, '|');
    // 设置详情属性
    token.info = (result[2] || '').replace(/^`(.*)`$/, '$1');

    token.level = state.level;
    // 更新解析位置
    state.pos += result[0].length;

    return true;
  });
};
