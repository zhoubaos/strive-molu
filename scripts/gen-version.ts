import { writeFile } from 'fs/promises';
import path from 'path';
import consola from 'consola';
import { smRoot } from '@strive-molu/build-utils';
import pkg from '../packages/strive-molu/package.json'; // need to be checked

// 获取 package/strive-molu/package.json 中的版本号
function getVersion() {
  const tagVer = process.env.TAG_VERSION;
  if (tagVer) {
    return tagVer.startsWith('v') ? tagVer.slice(1) : tagVer;
  } else {
    return pkg.version;
  }
}

const version = getVersion();

async function main() {
  consola.info(`Version: ${version}`);
  await writeFile(path.resolve(smRoot, 'version.ts'), `export const version = '${version}'\n`);
}

main();
