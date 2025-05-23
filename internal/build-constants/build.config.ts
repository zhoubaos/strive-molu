import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true, //输出前是否清空输出目录
  declaration: true, // 指定生成 .d.ts 文件
  rollup: {
    esbuild: {
      target: 'esnext'
    },
    emitCJS: true //生成 cjs 文件
  },
  externals: ['@pnpm/types'] //指定外部依赖
});
