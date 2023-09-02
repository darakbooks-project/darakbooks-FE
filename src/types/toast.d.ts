type DefaultToastType = {
  message: string;
  duration?: number;
  type: 'success' | 'error' | 'warning';
};

type CustomToastType = {
  message: string;
  duration?: number;
  backgroundColor: string;
  icon: string;
  fontColor: string;
};

export type CreateToastParams = DefaultToastType | CustomToastType;

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
