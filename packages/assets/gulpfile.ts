require('tsx/cjs');
import path from 'node:path';
import { dest, parallel, series, src } from 'gulp';
import imagemin, { mozjpeg, optipng, svgo } from 'gulp-imagemin';
import cache from 'gulp-cache';
import { smOutput } from '@strive-molu/build-utils';

const distFolder = path.resolve(__dirname, 'dist');
const distBundle = path.resolve(smOutput, 'assets');

/**
 * 打包静态资源文件
 */
const buildAssets = async () => {
  return src('src/**/*.{png,jpg,jpeg,svg}', {
    encoding: false
  })
    .pipe(
      // 缓存文件
      cache(
        imagemin([
          mozjpeg({ quality: 75, progressive: true }), //jpeg 图片压缩配置
          optipng({ optimizationLevel: 5 }),
          svgo()
        ]),
        {
          name: 'images'
        }
      )
    )
    .pipe(dest(distFolder));
};

export const copyAssetsBundle = () => {
  return src(`${distFolder}/**`).pipe(dest(distBundle));
};

export const build = series(buildAssets);
export default build;
