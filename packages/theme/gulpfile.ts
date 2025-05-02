import path from 'node:path';
import { Transform } from 'node:stream';
import chalk from 'chalk'; // 打印文本颜色库
import { type TaskFunction, dest, parallel, series, src } from 'gulp';
import gulpSass from 'gulp-sass';
import dSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import consola from 'consola';
import postcss from 'postcss';
import cssnano from 'cssnano';
import { smOutput } from '@strive-molu/build-utils';
//用于生成一个对象来表示文件（包含文件的路径，内容或其他元数据）。详情 https://www.gulpjs.com.cn/docs/api/vinyl/
import type Vinly from 'vinyl';

const distFolder = path.resolve(__dirname, 'dist');
const distBundle = path.resolve(smOutput, 'theme');

/**
 * 使用postcss和cssnano压缩css
 */
const compressWithCssnano = () => {
  const processor = postcss([
    cssnano({
      preset: [
        'default',
        {
          // 禁止颜色转换
          colormin: false,
          // 禁止字体转换
          minifyFontValues: false
        }
      ]
    })
  ]);
  return new Transform({
    objectMode: true,
    transform(chunk, _encoding, callback) {
      const file = chunk as Vinly;
      if (file.isNull()) {
        callback(null, file);
        return;
      }
      if (file.isStream()) {
        callback(new Error('字节流不支持转换'));
        return;
      }
      const cssString = file.contents!.toString();
      processor.process(cssString, { from: file.path }).then((result) => {
        const name = path.basename(file.path);
        file.contents = Buffer.from(result.css);
        consola.success(
          `${chalk.cyan(name)}: ${chalk.yellow(
            cssString.length / 1000
          )} KB -> ${chalk.green(result.css.length / 1000)} KB`
        );
        callback(null, file);
      });
    }
  });
};
/**
 * 打包样式文件
 */
const buildTheme = () => {
  const sass = gulpSass(dSass);
  // 不需要添加 sm 前缀的文件名
  const noSmPrefixFile = /(index|base)/;
  return (
    src(path.resolve(__dirname, 'src/*.scss'))
      .pipe(sass.sync()) // scss转css
      .pipe(autoprefixer({ cascade: false })) // css属性添加浏览器兼容前缀
      // .pipe(compressWithCssnano()) // 压缩css
      .pipe(
        rename((path) => {
          //给组件样式文件添加前缀

          if (!noSmPrefixFile.test(path.basename)) {
            path.basename = `sm-${path.basename}`;
          }
        })
      )
      .pipe(dest(distFolder))
  ); //输出资源
};
/**
 * 把packages/theme/dist 到 dist/strive-molu/theme
 * @returns
 */
export const copyThemeBundle = () => {
  return src(`${distFolder}/**`).pipe(dest(distBundle));
};
/**
 * 复制 packages/theme/src 到 dist/strive-molu/theme/src
 * @returns
 */
export const copyThemeSource = () => {
  return src(path.resolve(__dirname, 'src/**')).pipe(
    dest(path.resolve(distBundle, 'src'))
  );
};

export const build: TaskFunction = parallel(
  copyThemeSource,
  series(buildTheme, copyThemeBundle)
);
export default build;
