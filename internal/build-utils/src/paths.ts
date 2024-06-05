import { resolve } from 'path';

// 项目根路径
export const projRoot = resolve(__dirname, '..', '..', '..');
// 每个工作区的根路径
export const pkgRoot = resolve(projRoot, 'packages');
export const assetsRoot = resolve(pkgRoot, 'assets');
export const compRoot = resolve(pkgRoot, 'components');
export const hookRoot = resolve(pkgRoot, 'hooks');
export const directiveRoot = resolve(pkgRoot, 'directives');
export const smRoot = resolve(pkgRoot, 'strive-molu');
export const utilRoot = resolve(pkgRoot, 'utils');

// 插件根目录
export const pluginsRoot = resolve(projRoot, 'plugins');

// 打包配置文件根目录
export const buildRoot = resolve(projRoot, 'internal', 'build');

// Docs 相关
export const docsDirName = 'docs';
export const docRoot = resolve(projRoot, docsDirName);
export const vpRoot = resolve(docRoot, '.vitepress');

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist');
/** `/dist/strive-molu` */
export const smOutput = resolve(buildOutput, 'strive-molu');

// 每个包的 package.json 文件路径
export const projPackage = resolve(projRoot, 'package.json');
export const assetsPackage = resolve(assetsRoot, 'package.json');
export const compPackage = resolve(compRoot, 'package.json');
export const hookPackage = resolve(hookRoot, 'package.json');
export const directivePackage = resolve(directiveRoot, 'package.json');
export const smPackage = resolve(smRoot, 'package.json');
export const utilPackage = resolve(utilRoot, 'package.json');
export const docPackage = resolve(docRoot, 'package.json');
