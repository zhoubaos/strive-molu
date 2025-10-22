import { EventSystem } from './event-system';
import { BaseEvent, CustomKeyboardEvent, CustomMouseEvent } from './types/event';

// 元素dom事件转化为自定义统一事件对象
class EventFactory {
  context = null;
  isActive = false;
  eventSystem: EventSystem = new EventSystem();
  eventListeners: Map<Element, Map<string, EventListener>> = new Map();
  static createMouseEvent(event: MouseEvent): CustomMouseEvent {
    const point = {
      x: event.clientX,
      y: event.clientY
    };

    return {
      type: event.type as any,
      timestamp: Date.now(),
      preventDefault: () => event.preventDefault(),
      stopPropagation: () => event.stopPropagation(),
      postion: point
    };
  }

  static createKeyboardEvent(event: KeyboardEvent): CustomKeyboardEvent {
    return {
      type: event.type as any,
      timestamp: Date.now(),
      preventDefault: () => event.preventDefault(),
      stopPropagation: () => event.stopPropagation(),
      key: event.key,
      code: event.code
    };
  }

  /**
   * 绑定dom事件
   */
  private _bindDOMEvents(dom: Element) {
    const listeners = new Map<string, EventListener>();

    // 鼠标事件
    const mouseEvents = ['mousedown', 'mouseup', 'mousemove', 'mousewheel'];
    mouseEvents.forEach((eventName) => {
      const listener = (e: Event) => this._handleDOMEvent(e as MouseEvent);
      dom.addEventListener(eventName, listener, { passive: true });
      listeners.set(eventName, listener);
    });

    // 键盘事件
    const keyboardEvents = ['keydown', 'keyup'];
    keyboardEvents.forEach((eventName) => {
      const listener = (e: Event) => this._handleDOMEvent(e as KeyboardEvent);
      window.addEventListener(eventName, listener, { passive: true });
      listeners.set(`window:${eventName}`, listener);
    });

    this.eventListeners.set(dom, listeners);
  }
  /**
   * 处理原生事件
   * @param event
   */
  private async _handleDOMEvent(nativeEvent: MouseEvent | KeyboardEvent) {
    let event = null;

    // 转换为标准化事件
    if (nativeEvent instanceof MouseEvent) {
      event = EventFactory.createMouseEvent(nativeEvent);
    } else {
      event = EventFactory.createKeyboardEvent(nativeEvent);
    }

    // 处理事件
    await this.eventSystem.processEvent(event);
  }
}
