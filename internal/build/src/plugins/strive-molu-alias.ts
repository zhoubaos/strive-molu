import { PKG_NAME, PKG_PREFIX } from '@strive-molu/build-constants';

import type { Plugin } from 'rollup';

/**
 * 替换导入 theme 模块的路径
 * @returns
 */
export function StriveMoluAlias(): Plugin<any> {
  const themeChalk = 'theme';
  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const;
  const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const;

  return {
    name: 'strive-molu-alias-plugin',
    resolveId(source) {
      // source 导入模块的元素路径
      if (!source.startsWith(sourceThemeChalk)) return;
      return {
        id: source.replaceAll(sourceThemeChalk, bundleThemeChalk), // 替换模块的路径
        external: 'absolute' // 保持绝对路径
      };
    }
  };
}
