import 'vue';

declare module 'vue' {
  // GlobalComponents for Volar

  export interface GlobalComponents {
    SmButton: (typeof import('strive-molu'))['SmButton'];
    SmTable: (typeof import('strive-molu'))['SmTable'];
    SmMBox: typeof import('strive-molu')['SmMBox']
  }
}
export {};
