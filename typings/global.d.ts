import 'vue';

declare module 'vue' {
  // GlobalComponents for Volar

  export interface GlobalComponents {
    SmTable: (typeof import('strive-molu'))['SmTable'];
    SmLazyPicture: (typeof import('strive-molu'))['SmLazyPicture'];
    SmMultipleInput: (typeof import('strive-molu'))['SmMultipleInput'];
    SmFormFrame: (typeof import('strive-molu'))['SmFormFrame'];
  }
}
export {};
