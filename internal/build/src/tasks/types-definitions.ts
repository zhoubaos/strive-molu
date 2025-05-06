import path from 'path';
import { readFile, writeFile } from 'fs/promises';
import glob from 'fast-glob';
import { buildOutput } from '@strive-molu/build-utils';
import { pathRewriter, run } from '../utils';
import { copy, remove } from 'fs-extra';

/**
 * 根据packages下的文件自动生成对应的类型声明文件。
 * 根据ts-morph库的API，生成对应的类型声明文件。
 * ts-morph库是一个操作TypeScript/JavaScript AST的库。可以通过 https://www.pipipi.net/39810.html/amp#tsmorph 具体了解
 */
export const generateTypesDefinitions = async () => {
  await run(
    'npx vue-tsc -p tsconfig.web.json --declaration --emitDeclarationOnly --declarationDir dist/types'
  );
  const typesDir = path.join(buildOutput, 'types', 'packages');
  const filePaths = await glob(`**/*.d.ts`, {
    cwd: typesDir,
    absolute: true
  });
  const rewriteTasks = filePaths.map(async (filePath) => {
    const content = await readFile(filePath, 'utf8');
    await writeFile(filePath, pathRewriter('esm')(content), 'utf8');
  });
  await Promise.all(rewriteTasks);
  const sourceDir = path.join(typesDir, 'strive-molu');
  await copy(sourceDir, typesDir);
  await remove(sourceDir);
};
