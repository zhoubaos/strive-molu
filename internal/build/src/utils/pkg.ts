import { PKG_NAME, PKG_PREFIX } from '@strive-molu/build-constants';
import { buildConfig } from '../build-info';

import type { Module } from '../build-info';

/**
 * 重写文件内的路径
 * @returns
 */
export const pathRewriter = (module: Module) => {
  const config = buildConfig[module];

  return (id: string) => {
    id = id.replaceAll(`${PKG_PREFIX}/theme`, `${PKG_NAME}/theme`);
    id = id.replaceAll(`${PKG_PREFIX}/assets/src`, `${PKG_NAME}/assets`);
    id = id.replaceAll(`${PKG_PREFIX}/`, `${config.bundle.path}/`);
    return id;
  };
};
