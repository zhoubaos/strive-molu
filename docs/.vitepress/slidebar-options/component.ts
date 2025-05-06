import type { Option } from '@/typescript/option';

// 注意：层级最多只能6级
const options: Option[] = [
  {
    text: '基于ElementPlus组件',
    items: [
      {
        text: 'Table 表格',
        link: '/table'
      },
      {
        text: 'Button',
        link: '/button'
      }
    ]
  },
  {
    text: '其他组件',
    items: [
      {
        text: 'LazyPicture 懒加载图片',
        link: '/lazy-picture'
      },
      {
        text: 'DynamicForm 动态表单',
        link: '/dynamic-form'
      }
    ]
  }
];

export default options;
