import { ref } from 'vue';
import { rAF } from '@strive-molu/utils';

const count = ref(0);
function update() {
  count.value++;
  rAF(update);
}
update();
/**
 * 用于返回当前帧数是否大于等于n
 * @returns
 */
export function useDefer() {
  return function (n: number) {
    return count.value >= n;
  };
}
