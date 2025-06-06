/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './.vitepress/**/*.{html,jsx,ts,vue,md}',
    './examples/**/*',
    './html/**/*'
  ],
  theme: {
    // 重置屏幕变体
    screens: {
      sm: {
        max: '750px' // @media screen and (max-width: 750px) { ... }
      }
    },
    // 重置颜色
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      /**
       * 主题色
       */
      primary: {
        DEFAULT: 'var(--sm-color-primary)',
        light: 'var(--sm-color-primary-light-3)',
        lighter: 'var(--sm-color-primary-light-5)'
      },
      warning: 'var(--sm-color-warning)',
      danger: 'var(--sm-color-danger)',
      success: 'var(--sm-color-success)',
      info: 'var(--sm-color-info)',
      /**
       * 字体色
       */
      font: {
        DEFAULT: 'var(--sm-text-color-primary)',
        regular: 'var(--sm-text-color-regular)'
      },
      /**
       * 背景色
       */
      bg: {
        DEFAULT: 'var(--sm-fill-color)',
        light: 'var(--sm-fill-color-light)',
        lighter: 'var(--sm-fill-color-lighter)'
      }
    },

    // 重置字体大小
    fontSize: {
      sm: ['28px', '40px'], // text-sm => fontSize:28px lineHeight:40px
      base: ['14px', '20px'],
      12: ['12px', '15px'],
      16: ['16px', '20px'],
      18: '18px',
      20: '20px' // text-20 => fontSize:20px;
    },
    // 行高
    lineHeight: {
      14: '14px',
      16: '16px',
      20: '20px',
      22: '22px'
    },
    spacing: {
      sm: '4px', // m-sm => margin:4px;
      base: '8px', // m-base => margin:8px;
      0: '0',
      1: '1px', // m-1 => margin:1px;
      2: '2px', // p-2 => padding:2px;
      4: '4px', // w-4 => width:4px;
      6: '6px', // h-6 => height:6px;
      8: '8px', // gap-8 => gap:8px;
      10: '10px', // inset-10 => inset:10px;
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px'
    },
    borderRadius: {
      none: '0',
      sm: '4px', // rounded-sm => borderRadius:4px;
      DEFAULT: '6px', // rounded => borderRadius:6px;
      8: '8px', // rounded-8 => borderRadius:8px;
      10: '10px',
      12: '12px',
      14: '14px'
    },
    extend: {}
  }
};
