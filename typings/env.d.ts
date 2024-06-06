import type { Component, vShow } from 'vue';

declare global {
  const process: {
    env: {
      NODE_ENV: string;
    };
  };

  namespace JSX {
    interface IntrinsicAttributes {
      class?: any;
      style?: any;
    }
  }
}

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<any, any, any>;
  export default component;
}

/**
 * @description 扩展vue实例类型支持
 */
declare module 'vue' {
  export interface GlobalComponents {
    Component: (props: { is: Component | string }) => void;
  }

  export interface ComponentCustomProperties {
    vShow: typeof vShow;
  }
}

export {};
