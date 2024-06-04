import { PKG_NAME, PKG_PREFIX } from '@strive-molu/build-constants';
import chalk from 'chalk';

import type { Plugin } from 'rollup';

/**
 * 替换导入 theme 模块的路径
 * @returns
 */
export function StriveMoluAlias(): Plugin<any> {
  const sourceThemeChalk = `${PKG_PREFIX}/theme` as const;
  const bundleThemeChalk = `${PKG_NAME}/theme` as const;

  const sourceAssetsChalk = `${PKG_PREFIX}/assets/src` as const;
  const buildAssetsChalk = `${PKG_NAME}/assets` as const;

  return {
    name: 'strive-molu-alias-plugin',
    resolveId(sourceId) {
      if (!sourceId.startsWith(sourceThemeChalk) && !sourceId.includes(sourceAssetsChalk)) return;

      let transformId = sourceId;
      if (sourceId.startsWith(sourceThemeChalk)) {
        transformId = sourceId.replaceAll(sourceThemeChalk, bundleThemeChalk);
      } else if (sourceId.startsWith(sourceAssetsChalk)) {
        transformId = sourceId.replaceAll(sourceAssetsChalk, buildAssetsChalk);
      }
      return {
        id: transformId, // 替换模块的路径
        external: 'absolute' // 保持绝对路径
      };
    }
  };
}
