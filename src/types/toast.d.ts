export type CreateToastParams = {
  message: string;
  duration?: number;
  type?: 'success' | 'error' | 'warning';
  backgroundColor?: string;
  icon?: string;
  fontColor?: string;
};

export type CreateToastFn = (arg0: CreateToastParams) => void;

export type ToastManagerProps = {
  bind: (arg: CreateToastFn) => void;
};

export type ToastCreateType = {
  id: number;
} & CreateToastParams;

export type ToastItemType = {
  id?: number;
  onDone: () => void;
} & CreateToastParams;
