import path from 'path';
import { PKG_NAME } from '@strive-molu/build-constants';
import { smOutput } from '@strive-molu/build-utils';

import type { ModuleFormat } from 'rollup';

export const modules = ['esm', 'cjs'] as const;
export type Module = (typeof modules)[0 | 1];
export interface BuildInfo {
  module: 'ESNext' | 'CommonJS';
  format: ModuleFormat;
  ext: 'mjs' | 'cjs' | 'js';
  output: {
    /** e.g: `es` */
    name: string;
    /** e.g: `dist/strive-molu/es` */
    path: string;
  };

  bundle: {
    /** e.g: `strive-molu/es` */
    path: string;
  };
}

export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(smOutput, 'es')
    },
    bundle: {
      path: `${PKG_NAME}/es`
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(smOutput, 'lib')
    },
    bundle: {
      path: `${PKG_NAME}/lib`
    }
  }
};
export const buildConfigEntries = Object.entries(buildConfig) as BuildConfigEntries;

export type BuildConfig = typeof buildConfig;
export type BuildConfigEntries = [Module, BuildInfo][];

export const target = 'es2021';
