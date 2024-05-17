import { warn } from 'vue';
// import { fromPairs } from 'lodash-unified';
import { isObject } from '../../types';
import { hasOwn } from '../../objects';

import type { PropType } from 'vue';
import type {
  SmProp,
  SmPropConvert,
  SmPropFinalized,
  SmPropInput,
  SmPropMergeType,
  IfSmProp,
  IfNativePropType,
  NativePropType
} from './types';

export const smPropKey = '__smPropKey';

export const definePropType = <T>(val: any): PropType<T> => val;

export const isSmProp = (val: unknown): val is SmProp<any, any, any> => isObject(val) && !!(val as any)[smPropKey];

/**
 * @description: 构建prop，更好的优化类型
 * @example:
    // limited options
    // the type will be PropType<'light' | 'dark'>
    buildProp({
      type: String,
      values: ['light', 'dark'],
    } as const)
  * @example
    // limited options and other types
    // the type will be PropType<'small' | 'large' | number>
    buildProp({
      type: [String, Number],
      values: ['small', 'large'],
      validator: (val: unknown): val is number => typeof val === 'number',
    } as const)
 */
export const buildProp = <
  Type = never,
  Value = never,
  Validator = never,
  Default extends SmPropMergeType<Type, Value, Validator> = never,
  Required extends boolean = false
>(
  prop: SmPropInput<Type, Value, Validator, Default, Required>,
  key?: string
): SmPropFinalized<Type, Value, Validator, Default, Required> => {
  if (!isObject(prop) || isSmProp(prop)) return prop as any;

  const { values, required, default: defaultValue, type, validator } = prop;
  // 判断传入的值是否是符合规则
  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false;
          let allowedValues: unknown[] = [];
          if (values) {
            allowedValues = Array.from(values);
            if (hasOwn(prop, 'default')) {
              allowedValues.push(defaultValue);
            }
            valid ||= allowedValues.includes(val);
          }
          if (validator) valid ||= validator(val);

          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(', ');
            warn(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ''
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`
            );
          }
          return valid;
        }
      : undefined;

  const smProp: any = {
    type,
    required: !!required,
    validator: _validator,
    [smPropKey]: true
  };
  if (hasOwn(prop, 'default')) smProp.default = defaultValue;
  return smProp;
};

export const buildProps = function <
  Props extends Record<string, { [smPropKey]: true } | NativePropType | SmPropInput<any, any, any, any, any>>
>(
  props: Props
): {
  [K in keyof Props]: IfSmProp<Props[K], Props[K], IfNativePropType<Props[K], Props[K], SmPropConvert<Props[K]>>>;
} {
  return Object.fromEntries(Object.entries(props).map(([key, option]) => [key, buildProp(option as any, key)])) as any;
};
