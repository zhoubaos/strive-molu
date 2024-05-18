// 让commonjs模块可以导入ESM/TS模块
require('tsx/cjs');
/**
 * 让ESM模块可以导入commonjs模块  eg：require('tsx/esm')
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require('./commitlint.config.ts').default;
