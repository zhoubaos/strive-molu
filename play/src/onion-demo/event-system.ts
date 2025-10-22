import { BaseEvent, EventHandler, EventMiddleware, EventResult, InteractionState } from './types';

export class EventSystem {
  context = null;
  private static instance: EventSystem | null = null;
  private handlers: EventHandler[] = [];
  private middlewares: EventMiddleware[] = [];
  private interactionState: InteractionState = 'idle';

  constructor() {
    if (!EventSystem.instance) {
      EventSystem.instance = this;
    }
    return EventSystem.instance;
  }

  // 🔄 责任链模式：按优先级处理事件
  private async processCoreEvent(event: BaseEvent): Promise<EventResult> {
    const availableHandlers = this.handlers
      .filter((handler) => handler.canHandle(event, this.interactionState))
      .sort((a, b) => b.priority - a.priority); // 优先级排序

    for (const handler of availableHandlers) {
      const result = await handler.handle(event, this.context);
      if (result.handled) return result; // 短路机制
    }

    return { handled: false };
  }

  //   洋葱模型的中间件处理
  private async _processMiddlewares(event: BaseEvent, index: number): Promise<EventResult> {
    if (index >= this.middlewares.length) {
      return this.processCoreEvent(event);
    }

    const middleware = this.middlewares[index];
    const next = () => this._processMiddlewares(event, index + 1);
    return middleware.process(event, this.context!, next);
  }

  async processEvent(event: BaseEvent) {
    try {
      const result = await this._processMiddlewares(event, 0);

      // 🎯 更新交互状态
      if (result.newState && result.newState !== this.interactionState) {
        this.interactionState = result.newState;
      }

      // 🚀 关键：通过EventEmitter解耦通信
      if (result.requestRender) {
        // this.eventEmitter.emit('render:request');
      }

      // 发布事件处理结果，供其他模块使用
      //   this.eventEmitter.emit('event:processed', {
      //     event,
      //     result,
      //     state: this.interactionState
      //   });
    } catch (error) {
      console.error('事件处理失败！', error);
    }
  }
}
