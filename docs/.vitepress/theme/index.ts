import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import StriveMolu from 'strive-molu';
import { globals } from '../vitepress';
import elComponents from '../vitepress/el-component';
export default <Theme>{
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.use(StriveMolu);
    // 注册vitepress全局组件
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp);
    });
    elComponents.forEach((el) => {
      app.use(el);
    });
  }
};
