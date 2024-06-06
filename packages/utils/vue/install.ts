import type { SFCWithInstall, SFCInstallWithContext } from './typescript';
import { NOOP } from 'vue';
import type { App, Directive } from 'vue';

/**
 * 给传入VNode对象添加 install 方法，用于Vue.use 注册该组件
 * @param comp 组件
 */
export const withInstall = <T extends { name: string }, E extends Record<string, any>>(main: T, extra?: E) => {
  (main as any).install = (app: App) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp);
    }
  };

  return main as SFCWithInstall<T>;
};

/**
 * 给传入指令添加 install 方法，用于Vue.use 注册该指令
 * @param directive 指令
 * @param name 指令名称
 */
export const withInstallDirective = <T extends Directive>(directive: T, name: string): SFCWithInstall<T> => {
  (directive as any).install = (app: App) => {
    app.directive(name, directive);
  };
  return directive as SFCWithInstall<T>;
};

/**
 * 给组件添加一个空的 install 方法
 * @param component
 * @returns
 */
export const withNoopInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = NOOP;

  return component as SFCWithInstall<T>;
};
