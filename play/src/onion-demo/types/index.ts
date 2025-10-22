import { BaseEvent } from './event';

export * from './event';

export interface EventMiddleware {
  name: string;
  process(event: BaseEvent, context: any, next: () => Promise<EventResult>): Promise<EventResult>;
}

export interface EventHandler {
  name: string;
  priority: number;
  canHandle(event: BaseEvent, state: InteractionState): boolean;
  handle(event: BaseEvent, context: any): Promise<EventResult>;
}

export interface EventResult {
  handled: boolean; // 是否处理
  newState?: InteractionState; // 新交互状态
  requestRender?: boolean; // 是否需要重新渲染
  data?: Record<string, any>; // 额外数据
}
// 交互状态
export type InteractionState = 'idle' | 'hover' | 'dragging' | 'panning';
