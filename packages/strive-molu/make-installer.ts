import { version } from './version';
import type { App, Plugin } from 'vue';

const INSTALLED_KEY = 'INSTALLED_KEY';

// 生成一个安装器，用于安装所有导入的组件
export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App & { INSTALLED_KEY?: boolean }) => {
    // 如果Vue已经全局挂载组件，返回
    if (app[INSTALLED_KEY]) return;

    app[INSTALLED_KEY] = true;
    components.forEach((c) => app.use(c));
  };

  return {
    version,
    install
  };
};
