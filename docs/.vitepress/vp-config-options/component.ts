import type { Option } from '@/typescript/option';

// 注意：层级最多只能6级
const options: Option[] = [
  {
    text: '基于ElementPlus组件',
    items: [
      {
        text: 'Table',
        link: '/el-table'
      },
      {
        text: 'Button',
        link: '/el-button'
      }
    ]
  },
  {
    text: '其他组件',
    items: [
      {
        text: 'NetworkImg',
        link: '/network-img'
      }
    ]
  }
];

export default options;
