import component from '../vp-config-options/component';
import directive from '../vp-config-options/directive';
import util from '../vp-config-options/util';

// 获取组件的侧边栏配置
function getComponentSidebar() {
  return Object.values(component).map((item) => mapAddPrefix(item, '/component'));
}
// 获取指令的侧边栏配置
function getDirectiveSidebar() {
  return Object.values(directive).map((item) => mapAddPrefix(item, '/directive'));
}
// 获取工具函数的侧边栏配置
function getUtilSidebar() {
  return Object.values(util).map((item) => mapAddPrefix(item, '/util'));
}

type Item = {
  text: string;
  items?: Item[];
  link?: string;
};

// 给每个模块的子模块添加公共前缀
function mapAddPrefix(item: Item, prefix = '') {
  if (item.items && item.items.length) {
    return {
      ...item,
      items: item.items.map((child) => mapAddPrefix(child, prefix))
    };
  }
  return {
    ...item,
    link: '/pages' + prefix + item.link
  };
}

// 侧边栏配置
const getSidebars = () => {
  return {
    '/pages/component/': getComponentSidebar(),
    '/pages/directive/': getDirectiveSidebar(),
    '/pages/util/': getUtilSidebar()
  };
};

export const sidebar = getSidebars();
