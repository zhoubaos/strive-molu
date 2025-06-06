import 'vue';

declare module 'vue' {
  // GlobalComponents for Volar

  export interface GlobalComponents {
    SmTable: (typeof import('strive-molu'))['SmTable'];
    SmLazyPicture: (typeof import('strive-molu'))['SmLazyPicture'];
    SmMultipleInputBox: typeof import('strive-molu')['SmMultipleInputBox']
    SmMultipleInput: typeof import('strive-molu')['SmMultipleInput']
  }
}
export {};
