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
        text: 'FormFrame 表单框架',
        link: '/form-frame'
      }
    ]
  },
  {
    text: '自定义组件',
    items: [
      {
        text: 'LazyPicture 懒加载图片',
        link: '/lazy-picture'
      },
      // {
      //   text: 'DynamicForm 动态表单',
      //   link: '/dynamic-form'
      // }
      {
        text: 'MultipleInput 多行输入',
        link: '/multiple-input'
      },
      {
        text: 'Cascader 级联选择器',
        link: '/cascader'
      },
      {
        text: 'DragResize 拖拽缩放盒子',
        link: '/drag-resize'
      }
    ]
  }
];

export default options;
