import '@vue/runtime-core';

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar

  export interface GlobalComponents {
    SmButton: (typeof import('../packages/strive-molu'))['SmButton'];
    SmTable: (typeof import('../packages/strive-molu'))['SmTable'];
  }
}
export {};
