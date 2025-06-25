#!/usr/bin/env zx
import { $, question, cd, path, argv, fs, os, chalk, usePowerShell } from 'zx';
import { consola } from 'consola';
// 让powerShell可以运行该脚本
// 让powerShell可以兼容运行该脚本
if (os.platform() === 'win32') {
  usePowerShell();
}
void (async function () {
  // 需要创建的组件名称
  const NAME = await question('需要创建的组件名称：');
  // 将组件名称转换为首字母大写驼峰式
  const NORRMAL_NAME = NAME.split(/[_-]/) // 分割字符串
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // 将每个单词的首字母大写
    .join(''); // 将单词连接起来

  // 首字母转换为小写
  const LOWER_NAME = NORRMAL_NAME.charAt(0).toLowerCase() + NORRMAL_NAME.slice(1);

  // 检查输入的组件名称
  if (argv._.length !== 0 || /\s+/.test(NAME) || NAME === '') {
    exitWithError('组件名称不能是空格或空');
  }

  // 获取脚本的父目录的路径
  const parentDir = path.dirname(__dirname);
  // 切换工作目录，
  cd(path.join(parentDir, '..', 'packages'));

  // 组件目录
  const DIR_NAME = `components/${NAME}`;
  if (fs.existsSync(DIR_NAME)) {
    exitWithError('该组件已经存在');
  }

  // 递归创建组件目录
  await $`mkdir -p ${DIR_NAME}`;

  await $`mkdir -p ${DIR_NAME}/src`;

  await $`mkdir -p ${DIR_NAME}/style`;

  await Promise.all([
    writeComSameNameVueFileV2(),
    writeComSameNameTsFileV2(),
    writeComInstanceFile(),
    writeComExportTsFile(),
    createComStyleTsFile()
    // appendExportContent()
  ]);

  // 写入同名vue文件
  async function writeComSameNameVueFile() {
    try {
      const filePath = `${DIR_NAME}/src/${NAME}.vue`;
      const fileContent = `
    <template>
    <div class="sm-${NAME.toLowerCase()}">
      <slot />
    </div>
    </template>
    
    <script lang="ts" setup>
    import { ${LOWER_NAME}Props } from './${NAME}'
    
    defineOptions({
      name: 'Sm${NORRMAL_NAME}',
    })
    
    const props = defineProps(${LOWER_NAME}Props)
    
    // init here
    </script>
    <!-- 禁止在vue文件内添加style标签 -->
    `;
      await fs.writeFile(filePath, fileContent);
      consola.success(chalk.green(`创建成功：${filePath}`));
    } catch (error) {
      exitWithError(error);
    }
  }

  // 写入同名vue文件
  async function writeComSameNameVueFileV2() {
    try {
      const filePath = `${DIR_NAME}/src/${NAME}.vue`;
      const fileContent = `
    <template>
    <div class="sm-${NAME.toLowerCase()}">
      <slot />
    </div>
    </template>
    
    <script lang="ts" setup>
    import { type ${NORRMAL_NAME}Props, default${NORRMAL_NAME}Props } from './${NAME}'
    
    defineOptions({
      name: 'Sm${NORRMAL_NAME}',
    })
    
    const props = withDefaults(defineProps<${NORRMAL_NAME}Props>(), default${NORRMAL_NAME}Props);
    
    // init here
    </script>
    <!-- 禁止在vue文件内添加style标签 -->
    `;
      await fs.writeFile(filePath, fileContent);
      consola.success(chalk.green(`创建成功：${filePath}`));
    } catch (error) {
      exitWithError(error);
    }
  }

  // 写入同名js文件
  async function writeComSameNameTsFile() {
    try {
      const filePath = `${DIR_NAME}/src/${NAME}.ts`;
      const fileContent = `
    import { buildProps } from '@strive-molu/utils';
    import type { ExtractPropTypes } from 'vue';
    
    export const ${LOWER_NAME}Props = buildProps({});

    // 获取运行时且面向内部的prop类型
    // eg：https://cn.vuejs.org/api/utility-types.html#extractproptypes
    export type ${NORRMAL_NAME}Props = ExtractPropTypes<typeof ${LOWER_NAME}Props>;
    `;
      await fs.writeFile(filePath, fileContent);
      consola.success(chalk.green(`创建成功：${filePath}`));
    } catch (error) {
      exitWithError(error);
    }
  }

  // 写入同名js文件
  async function writeComSameNameTsFileV2() {
    try {
      const filePath = `${DIR_NAME}/src/${NAME}.ts`;
      const fileContent = `
      // 组件props类型 
    export type ${NORRMAL_NAME}Props = {};
      // 组件props默认值
    export const default${NORRMAL_NAME}Props: Partial<${NORRMAL_NAME}Props> = {};
    `;
      await fs.writeFile(filePath, fileContent);
      consola.success(chalk.green(`创建成功：${filePath}`));
    } catch (error) {
      exitWithError(error);
    }
  }

  // 写入组件实例文件
  async function writeComInstanceFile() {
    try {
      const filePath = `${DIR_NAME}/src/instance.ts`;
      const fileContent = `
    import type ${NORRMAL_NAME} from './${NAME}.vue';
    
    // ${NAME}组件vue实例类型
    export type ${NORRMAL_NAME}Instance = InstanceType<typeof ${NORRMAL_NAME}>;
    `;
      await fs.writeFile(filePath, fileContent);
      consola.success(chalk.green(`创建成功：${filePath}`));
    } catch (error) {
      exitWithError(error);
    }
  }

  // 写入组件导入ts文件
  async function writeComExportTsFile() {
    try {
      const filePath = `${DIR_NAME}/index.ts`;
      const fileContent = `
    import { withInstall } from '@strive-molu/utils'
    import ${NORRMAL_NAME} from './src/${NAME}.vue'

    export const Sm${NORRMAL_NAME} = withInstall(${NORRMAL_NAME})
    export default Sm${NORRMAL_NAME}

    export type { ${NORRMAL_NAME}Instance } from './src/instance';
    `;
      await fs.writeFile(filePath, fileContent);
      consola.success(chalk.green(`创建成功：${filePath}`));
    } catch (error) {
      exitWithError(error);
    }
  }

  // 创建style文件
  async function createComStyleTsFile() {
    try {
      // 创建less文件
      const filePath1 = `${DIR_NAME}/style/index.ts`;
      const content1 = `// 该组件依赖的样式less文件\nimport '@strive-molu/components/base/style';`;
      await fs.writeFile(filePath1, content1);
      consola.success(chalk.green(`创建成功：${filePath1}`));

      // 创建css文件
      const filePath2 = `${DIR_NAME}/style/css.ts`;
      const content2 = `// 该组件依赖的样式css文件\nimport '@strive-molu/components/base/style/css';`;
      await fs.writeFile(filePath2, content2);
      consola.success(chalk.green(`创建成功：${filePath2}`));
    } catch (error) {
      exitWithError(error);
    }
  }

  // 添加组件导出语句
  async function appendExportContent() {
    try {
      const filePath = `components/index.ts`;
      const fileContent = `
    export * from './${NAME}';
    `;
      await fs.appendFile(filePath, fileContent);
    } catch (error) {
      exitWithError(error);
    }
  }

  consola.success(chalk.green('组件文件创建完毕！'));
})();

// 处理错误公共函数
function exitWithError(errorMsg: unknown) {
  consola.error(chalk.red(errorMsg));
  process.exit(1);
}
