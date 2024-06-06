// GlobalComponents for Volar
declare module 'vue' {
  export interface GlobalComponents {
    SmButton: (typeof import('strive-molu'))['SmButton'];
    SmTable: (typeof import('strive-molu'))['SmTable'];
    SmLazyPicture: (typeof import('strive-molu'))['SmLazyPicture'];
  }
}

export {};
