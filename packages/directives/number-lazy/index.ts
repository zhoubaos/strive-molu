import { Directive, DirectiveBinding, ObjectDirective } from 'vue';
import { animationFn } from '@strive-molu/utils';

/**
 * @arg1 Number 动画持续时间ms （默认400）
 * @arg2 Number 保留小数位数
 * @value Number 数字内容 必填
 */
export const NumberLazy: Directive = (el, binding: DirectiveBinding<number, 'isThousands'>) => {
  const {
    value = 0,
    oldValue = 0,
    arg,
    modifiers: { isThousands }
  } = binding;
  if (value !== 0 && value === oldValue) return value;
  // 指令默认参数
  const defaultArg = [400, undefined];
  // 获取传入指令的参数，通过 v-numberLazy:param1:param2的方式传入 ，param1为动画执行时间，param2为保留小数位数
  const [duration, decimal] = Object.assign(
    defaultArg,
    typeof arg === 'string' ? arg.split(':').map((item) => Number(item)) : []
  );
  const numValue = Number(value);
  if (Number.isNaN(numValue)) {
    el.textContent = value;
    console.error('v-number-lazy指令只接受数字类型参数');
  } else {
    animationFn(
      {
        from: 0,
        to: numValue,
        duration,
        decimal
      },
      (val) => {
        el.textContent = isThousands ? val.toLocaleString('en-US') : val;
      }
    );
  }
};
