import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  include: [`${__dirname}/**/*.{vue,md,html,jsx,tsx}`],
  exclude: [`${__dirname}/node_modules/**/*`]
});
