const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended', // eslint默认推荐配置
    'plugin:markdown/recommended-legacy', //扩展md文件的推荐配置
    'plugin:vue/vue3-recommended', //扩展vue文件的推荐配置
    'plugin:@typescript-eslint/recommended', // 扩展TypeScript代码的推荐配置  // 'plugin:prettier/recommended', // 用于在eslint集成prettier
    'prettier' //直接使用prettier进行格式化代码，和plugin:prettier/recommended互斥
  ],
  // 给不同类型文件配置不同规则
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'no-undef': 'off'
      }
    },
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-duplicates': 'off' //关闭重复导入检查
      }
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue']
      },
      rules: {
        'no-undef': 'off' //关闭未声明变量检查
      }
    }
  ],
  rules: {
    'prettier/prettier': 'off',
    'no-debugger': 'warn',

    // ts
    '@typescript-eslint/no-unused-vars': 'off', // 未使用变量警告
    '@typescript-eslint/no-explicit-any': 'off', //允许使用any
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowedNames: ['that'] // this可用的局部变量名称
      }
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false
        }
      }
    ],
    '@typescript-eslint/ban-ts-comment': 'off', //允许使用@ts-ignore
    '@typescript-eslint/no-non-null-assertion': 'off', //允许使用非空断言

    // vue
    'vue/no-v-html': 'off',
    'vue/no-mutating-props': 'off',
    'vue/prefer-import-from-vue': 'off',
    'vue/multi-word-component-names': 'off' // 禁用vue文件强制多个单词命名
  }
});
