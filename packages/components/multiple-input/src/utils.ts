/**
 * @desc 生成input配置
 */
export const useGenerateInputConfig = (() => {
  let n = 1;
  return (defaultValue = '') => {
    return {
      id: n++,
      value: defaultValue,
      validate: false,
      el: null
    };
  };
})();
