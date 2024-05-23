import { createApp } from 'vue';

(async () => {
  const apps = import.meta.glob('./src/*.vue');
  const name = location.pathname.replace(/^\//, '') || 'demo';
  const file = apps[`./src/${name}.vue`];
  if (!file) {
    location.pathname = 'demo';
    return;
  }
  const App = ((await file()) as any).default;
  const app = createApp(App);

  app.mount('#play');
})();
