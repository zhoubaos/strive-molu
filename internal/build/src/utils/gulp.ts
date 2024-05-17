import { buildRoot } from '@strive-molu/build-utils';
import { run } from './process';

import type { TaskFunction } from 'undertaker';

export const withTaskName = <T extends TaskFunction>(name: string, fn: T) => Object.assign(fn, { displayName: name });

export const runTask = (name: string) =>
  withTaskName(`shellTask:${name}`, () => run(`pnpm run start ${name}`, buildRoot));
