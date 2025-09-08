import process from 'process';
import path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { consola } from 'consola';
import * as vueCompiler from 'vue/compiler-sfc';
import glob from 'fast-glob';
import chalk from 'chalk';
import { Project } from 'ts-morph';
import type { CompilerOptions, SourceFile } from 'ts-morph';
import { buildOutput, smRoot, excludeFiles, pkgRoot, projRoot } from '@strive-molu/build-utils';
import { pathRewriter } from '../utils';

const TSCONFIG_PATH = path.resolve(projRoot, 'tsconfig.web.json');
const outDir = path.resolve(buildOutput, 'types');

/**
 * 根据packages下的文件自动生成对应的类型声明文件。
 * 根据ts-morph库的API，生成对应的类型声明文件。
 * ts-morph库是一个操作TypeScript/JavaScript AST的库。可以通过 https://www.pipipi.net/39810.html/amp#tsmorph 具体了解
 */
export const generateTypesDefinitions = async () => {
  // ts-morph编译配置
  const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true, //只输出.d.ts文件
    outDir, //指定编译后的文件输出目录
    baseUrl: projRoot,
    preserveSymlinks: true,
    skipLibCheck: true,
    noImplicitAny: false
  };
  // 初始化一个typescript项目
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: TSCONFIG_PATH, // tsconfig.json文件路径，根据tsconfig.json获取源文件
    skipAddingFilesFromTsConfig: true //跳过解析tsconfig.ts中 include属性指定的源文件
  });

  // 添加源文件
  const sourceFiles = await addSourceFiles(project);
  consola.success('源文件添加成功');

  // 检查ts类型是否正确
  // typeCheck(project);

  consola.success('类型检查通过');
  // 对项目的所有源文件输入文件
  await project.emit({
    emitOnlyDtsFiles: true //只输入.d.ts文件
  });

  const tasks = sourceFiles.map(async (sourceFile) => {
    // 获取源文件路径相对pkgRoot目录的路径
    const relativePath = path.relative(pkgRoot, sourceFile.getFilePath());
    consola.trace(chalk.yellow(`开始生成TS声明文件: ${chalk.bold(relativePath)}`));

    const emitOutput = sourceFile.getEmitOutput();
    // 获取输出的文件，由于上面设置了emitDeclarationOnly: true，所以只会输出.d.ts文件
    const emitFiles = emitOutput.getOutputFiles();
    if (emitFiles.length === 0) {
      throw new Error(`Emit no file: ${chalk.bold(relativePath)}`);
    }

    const subTasks = emitFiles.map(async (outputFile) => {
      // 获取输出文件的路径
      const filepath = outputFile.getFilePath();
      // 递归创建输出目录
      await mkdir(path.dirname(filepath), {
        recursive: true
      });
      // 把输出文件中导入模块的路径进行重写
      await writeFile(filepath, pathRewriter('esm')(outputFile.getText()), 'utf8');

      consola.success(chalk.green(`TS声明文件: ${chalk.bold(relativePath)} 生成成功！`));
    });

    await Promise.all(subTasks);
  });

  await Promise.all(tasks);
};
/**
 * 添加ts-morph解析的源文件
 * @param project
 * @returns
 */
async function addSourceFiles(project: Project) {
  // 通过路径的方式添加源文件
  project.addSourceFileAtPath(path.resolve(projRoot, 'typings/env.d.ts'));

  const globSourceFile = '**/*.{js?(x),ts?(x),vue}';
  /**
   * 通过fast-glob库快速匹配符合规则的文件路径，并通过数组返回
   * fast-glob 文档地址 https://github.com/mrmlnc/fast-glob
   */

  // 匹配packages下的文件路径，但不包含packages/strive-molu下的文件路径
  const filePaths = excludeFiles(
    await glob([globSourceFile, '!strive-molu/**/*'], {
      cwd: pkgRoot,
      absolute: true, //返回绝对路径，如果匹配规则有 !${__dirname}/*.js 这种模式，此属性必须为true
      onlyFiles: true //只匹配文件
    })
  );
  // 匹配packages下的strive-molu模块下符合规则的文件路径
  const epPaths = excludeFiles(
    await glob(globSourceFile, {
      cwd: smRoot,
      onlyFiles: true
    })
  );

  const sourceFiles: SourceFile[] = [];
  await Promise.all([
    ...filePaths.map(async (file) => {
      /**
       * 对vue文件先进行解析，获取script/scriptSetup标签中的内容，然后通过字符串文本的方式创建源文件
       */
      if (file.endsWith('.vue')) {
        const content = await readFile(file, 'utf-8');
        // 判断源文件是否有 @ts-nocheck 注释
        const hasTsNoCheck = content.includes('@ts-nocheck');
        // 编译.vue源文件，
        const sfc = vueCompiler.parse(content);
        const { script, scriptSetup } = sfc.descriptor;

        if (script || scriptSetup) {
          let content = (hasTsNoCheck ? '// @ts-nocheck\n' : '') + (script?.content ?? '');

          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx'
            });
            content += compiled.content;
          }

          const lang = scriptSetup?.lang || script?.lang || 'js';
          // 通过字符串文本的方式创建源文件，但不会保存在文件系统中，除非调用save方法
          const sourceFile = project.createSourceFile(`${path.relative(process.cwd(), file)}.${lang}`, content);
          sourceFiles.push(sourceFile);
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file);
        sourceFiles.push(sourceFile);
      }
    }),
    ...epPaths.map(async (file) => {
      const content = await readFile(path.resolve(smRoot, file), 'utf-8');
      sourceFiles.push(project.createSourceFile(path.resolve(pkgRoot, file), content));
    })
  ]);

  return sourceFiles;
}

/**
 * 用于检查项目中的类型是否错误
 * @param project
 */
function typeCheck(project: Project) {
  // 获取项目内所有文件的编译错误
  const diagnostics = project.getPreEmitDiagnostics();
  if (diagnostics.length > 0) {
    // 打印格式化输出编译错误
    consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics));
    const err = new Error('生成.d.ts文件失败！');
    throw err;
  }
}
