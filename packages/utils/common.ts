import { round } from 'lodash-es';
/**
 * 千分位。
 * @param {Number} Num 金额
 * @param {Boolean} isFixed 是否保留两位小数
 *
 */
export const toThousands = (num: number, isFixed = true) => {
  // 例（123456.78）
  const oldNum = isNaN(num) ? 0 : Number(num);
  if (oldNum === 0) return 0; // 传入的数值为空直接返回空对象
  let newNum = oldNum.toLocaleString('en-US'); // 数字转成千分位 = 123,456.78
  const numArr = newNum.split('.'); // 按小数点吧数字拆分 = [123,456, 78]
  if (!isFixed) {
    // 如果传了第二个参数，如果有小数位直接返回，否则向下执行
    if (!numArr[1]) {
      // 如果数组没有下标1的元素，就加.00，例：123,456 = 123,456.00
      newNum = newNum + '.00';
    } else if (numArr[1].length === 1) {
      // 如果数组下标1的元素只有一位小数，就加个0，例：123,456.7 = 123,456.70
      newNum = newNum + '0';
    } else if (numArr[1].length >= 2) {
      // // 如果数组下标1的元素小数位大于等于2位，就截取前两位，例：123,456.789 = 123,456.78
      newNum = numArr[0] + '.' + numArr[1].substr(0, 2);
    }
  }
  return newNum;
};
