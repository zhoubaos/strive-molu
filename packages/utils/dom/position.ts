import { isClient } from '../browser';

/**
 * @des 判断元素是否在容器内
 * @param el
 * @param container
 * @returns
 */
export const isInContainer = (el?: Element, container?: Element | Window): boolean => {
  if (!isClient || !el || !container) return false;

  // 获取元素相对于视窗的位置
  const elRect = el.getBoundingClientRect();
  // 把DOMRect类型中的top、right、bottom、left属性组成一个新的类型
  let containerRect: Pick<DOMRect, 'top' | 'bottom' | 'left' | 'right'>;
  if (container instanceof Element) {
    containerRect = container.getBoundingClientRect();
  } else {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    };
  }
  return (
    elRect.bottom <= containerRect.bottom &&
    elRect.top >= containerRect.top &&
    elRect.left >= containerRect.left &&
    elRect.right <= containerRect.right
  );
};

/**
 * @dsc 获取元素距离文档顶部的距离
 * @param el 目标元素
 * @returns
 */
export const getOffsetTop = (el: HTMLElement) => {
  let offset = 0;
  let parent = el;

  while (parent) {
    offset += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement;
  }

  return offset;
};

/**
 * @dsc 获取目标元素距离容器顶部的距离
 * @param el 目标元素
 * @param containerEl 容器元素
 * @returns
 */
export const getOffsetTopDistance = (el: HTMLElement, containerEl: HTMLElement) => {
  return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
};
