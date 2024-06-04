import { smPackage, getPackageDependencies } from '@strive-molu/build-utils';

import type { OutputOptions, RollupBuild } from 'rollup';

/**
 * 用于设置 packages/strive-molu 模块的外部依赖
 * @param options
 * @returns
 */
export const generateExternal = async (options: { full: boolean }) => {
  // 获取strive-molu包的依赖包名称
  const { dependencies, peerDependencies } = getPackageDependencies(smPackage);

  return (id: string) => {
    const packages: string[] = [...peerDependencies];
    if (!options.full) {
      packages.push('@vue', ...dependencies);
    }
    // [/\.css$/, /\.less$/].some((rg) => rg.test(id));
    return [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
  };
};

// 用于根据配置生成bundle文件
export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)));
}
// 格式化生成的bundle文件名
export function formatBundleFilename(name: string, minify: boolean, ext: string) {
  return `${name}${minify ? '.min' : ''}.${ext}`;
}
