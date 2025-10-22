export interface BaseEvent {
  type: string;
  timestamp: number;
  preventDefault: () => void;
  stopPropagation: () => void;
}

// 鼠标事件
export interface CustomMouseEvent extends BaseEvent {
  type: 'mouse:down' | 'mouse:up' | 'mouse:move' | 'mouse:wheel';
  postion: {
    x: number;
    y: number;
  };
}

// 键盘事件
export interface CustomKeyboardEvent extends BaseEvent {
  type: 'keyboard:down' | 'keyboard:up';
  key: string;
  code: string;
}
