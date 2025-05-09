import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind
} from 'unocss';

export default defineConfig({
  presets: [presetWind(), presetAttributify(), presetIcons()],
  content: {
    pipeline: {
      include: [`./**/*`],
      exclude: [`./node_modules/**/*`, `./.vitepress/cache/**/*`]
    }
  }
});
