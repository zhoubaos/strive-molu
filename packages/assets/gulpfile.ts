import path from 'node:path';
import { TaskFunction, dest, series, src } from 'gulp';
import imagemin, { mozjpeg, optipng, svgo } from 'gulp-imagemin';
import { smOutput } from '@strive-molu/build-utils';

const distFolder = path.resolve(__dirname, 'dist');
const distBundle = path.resolve(smOutput, 'assets');

/**
 * 打包静态资源文件
 */
const buildAssets = () => {
  return src('src/**/*.{png,jpg,jpeg,svg}', {
    encoding: false
  })
    .pipe(
      // 缓存文件
      imagemin([
        mozjpeg({ quality: 75, progressive: true }), //jpeg 图片压缩配置
        optipng({ optimizationLevel: 5 }),
        svgo()
      ])
    )
    .pipe(dest(distFolder));
};
/**
 * 复制打包后的静态资源文件到输出目录
 * @returns
 */
export const copyAssetsBundle = () => {
  return src(`${distFolder}/**/*`, {
    encoding: false
  }).pipe(dest(distBundle));
};

export const build: TaskFunction = series(buildAssets, copyAssetsBundle);
export default build;
