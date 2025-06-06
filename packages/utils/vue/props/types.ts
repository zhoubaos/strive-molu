import type { smPropKey } from './runtime';
import type { ExtractPropTypes, PropType } from 'vue';
import type { IfNever, UnknownToNever, WritableArray } from './util';

type Value<T> = T[keyof T];

/**
 * 提取单个 prop 的参数类型
 *
 * @example
 * ExtractPropType<{ type: StringConstructor }> => string | undefined
 * ExtractPropType<{ type: StringConstructor, required: true }> => string
 * ExtractPropType<{ type: BooleanConstructor }> => boolean
 */
export type ExtractPropType<T extends object> = Value<
  ExtractPropTypes<{
    key: T;
  }>
>;
/**
 * 通过 `ExtractPropType` 提取类型，接受 `PropType<T>`、`XXXConstructor`、`never`...
 *
 * @example
 * ResolvePropType<BooleanConstructor> => boolean
 * ResolvePropType<PropType<T>> => T
 **/
export type ResolvePropType<T> = IfNever<
  T,
  never,
  ExtractPropType<{
    type: WritableArray<T>;
    required: true;
  }>
>;
/**
 * 合并 Type、Value、Validator 的类型
 *
 * @example
 * EpPropMergeType<StringConstructor, '1', 1> =>  1 | "1" // ignores StringConstructor
 * EpPropMergeType<StringConstructor, never, number> =>  string | number
 */
export type SmPropMergeType<Type, Value, Validator> =
  | IfNever<UnknownToNever<Value>, ResolvePropType<Type>, never>
  | UnknownToNever<Value>
  | UnknownToNever<Validator>;

/**
 * 处理输入参数的默认值（约束）
 */
export type SmPropInputDefault<
  Required extends boolean,
  Default
> = Required extends true
  ? never
  : Default extends Record<string, unknown> | Array<any>
    ? () => Default
    : (() => Default) | Default;

/**
 * 原生 prop `类型，BooleanConstructor`、`StringConstructor`、`null`、`undefined` 等
 */
export type NativePropType =
  | ((...args: any) => any)
  | { new (...args: any): any }
  | undefined
  | null;
export type IfNativePropType<T, Y, N> = [T] extends [NativePropType] ? Y : N;

/**
 * prop 输入参数（约束）
 *
 * @example
 * EpPropInput<StringConstructor, never, 'a', never, true>
 * ⬇️
 * {
    type?: StringConstructor | undefined;
    required?: true | undefined;
    values?: readonly "a"[] | undefined;
    validator?: ((val: any) => boolean) | ((val: any) => val is never) | undefined;
    default?: undefined;
  }
 */
export type SmPropInput<
  Type,
  Value,
  Validator,
  Default extends SmPropMergeType<Type, Value, Validator>,
  Required extends boolean
> = {
  type?: Type;
  required?: Required;
  values?: readonly Value[];
  validator?: ((val: any) => val is Validator) | ((val: any) => boolean);
  default?: SmPropInputDefault<Required, Default>;
};

/**
 * prop 输出参数。
 *
 * @example
 * SmProp<'a', 'b', true>
 * ⬇️
 * {
    readonly type: PropType<"a">;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly default: "b";
    __epPropKey: true;
  }
 */
export type SmProp<Type, Default, Required> = {
  readonly type: PropType<Type>;
  readonly required: [Required] extends [true] ? true : false;
  readonly validator: ((val: unknown) => boolean) | undefined;
  [smPropKey]: true;
} & IfNever<Default, unknown, { readonly default: Default }>;

/**
 * Determine if it is `EpProp`
 */
export type IfSmProp<T, Y, N> = T extends { [smPropKey]: true } ? Y : N;

/**
 * 将输入转换为输出
 */
export type SmPropConvert<Input> =
  Input extends SmPropInput<
    infer Type,
    infer Value,
    infer Validator,
    any,
    infer Required
  >
    ? SmPropFinalized<Type, Value, Validator, Input['default'], Required>
    : never;

/**
 * Finalized conversion output
 *
 * 最终转换 EpProp
 */
export type SmPropFinalized<Type, Value, Validator, Default, Required> = SmProp<
  SmPropMergeType<Type, Value, Validator>,
  UnknownToNever<Default>,
  Required
>;

export {};
