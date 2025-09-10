import { MultipleInputProps } from './multiple-input';
import { QuickBtnConfig } from './types';
import { useGenerateInputConfig } from './utils';

/**
 * 快捷操作
 * @param props
 */
export function useQuickActions(props: MultipleInputProps) {
  let quickBtnConfig: QuickBtnConfig[] = [
    {
      name: '清空',
      handleCallback: (list) => {
        return [useGenerateInputConfig()];
      }
    }
  ];
  // 乱序
  if (props.supporOutSort) {
    quickBtnConfig.unshift({
      name: '乱序',
      handleCallback: (list) => {
        return list.sort(() => Math.random() - 0.5);
      }
    });
  }

  // 扩展传入的快捷操作
  quickBtnConfig = quickBtnConfig.concat(props.extendQuickActions);

  return { quickBtnConfig };
}
