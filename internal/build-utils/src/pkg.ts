import { findWorkspacePackages } from '@pnpm/find-workspace-packages';
import { projRoot } from './paths';
import type { ProjectManifest } from '@pnpm/types';

// 获取工作区间下所有的模块
export const getWorkspacePackages = () => findWorkspacePackages(projRoot);
/**
 * @description 获取目录下所有工作区间的名称
 * @param dir 目录
 * @returns
 */
export const getWorkspaceNames = async (dir = projRoot) => {
  const pkgs = await findWorkspacePackages(dir);
  return pkgs
    .filter((pkg) => pkg.dir.startsWith(dir))
    .map((pkg) => pkg.manifest.name)
    .filter((name): name is string => !!name);
};
/**
 * @description 获取目录下所有工作区间的目录
 * @param rootdir 目录
 */
export const getWorkspaceNameDirs = async (rootdir = projRoot) => {
  const pkgs = await findWorkspacePackages(rootdir);
  return pkgs
    .filter((pkg) => pkg.dir.startsWith(rootdir) && pkg.manifest.name)
    .map((pkg) => [pkg.manifest?.name, pkg.dir] as const)
    .filter((nameDir) => nameDir[0] && nameDir[1]) as [string, string][];
};

// 获取包的 package.json 文件配置
export const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as ProjectManifest;
};
// 获取包的 package.json 文件的 dependencies 和 peerDependencies 属性name值
export const getPackageDependencies = (pkgPath: string): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies)
  };
};
// 排除文件路径数组不符合规则的文件路径
export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist'];
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)));
};
