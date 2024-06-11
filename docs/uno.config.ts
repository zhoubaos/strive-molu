import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  content: {
    pipeline: {
      include: [`${__dirname}/**/*.{vue,md,html,jsx,tsx}`],
      exclude: [`${__dirname}/node_modules/**/*`]
    }
  },
  presets: [presetUno(), presetAttributify(), presetIcons()]
});
