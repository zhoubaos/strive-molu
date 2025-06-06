import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import striveMolu from 'strive-molu';
import { globals } from '../vitepress';
import elementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

export default <Theme>{
  extends: DefaultTheme,
  enhanceApp: ({ app }) => {
    app.use(striveMolu);

    app.use(elementPlus, {
      locale: zhCn
    });
    // 注册vitepress全局组件
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp);
    });
  }
};
