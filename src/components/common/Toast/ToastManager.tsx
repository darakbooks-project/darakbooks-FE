import { useCallback, useEffect, useState } from 'react';

import {
  CreateToastParams,
  ToastCreateType,
  ToastManagerProps,
} from '@/types/toast';

import ToastItem from './ToastItem';

const ToastManager = ({ bind }: ToastManagerProps) => {
  const [toasts, setToasts] = useState<ToastCreateType[]>([]);

  const createToast = useCallback(
    ({
      message,
      duration,
      type,
      backgroundColor,
      icon,
      fontColor,
    }: CreateToastParams) => {
      const newToast: ToastCreateType = {
        id: Math.random(),
        message,
        duration,
        type,
        backgroundColor,
        icon,
        fontColor,
      };
      setToasts((oldToasts) => [newToast, ...oldToasts]);
    },
    [],
  );

  const removeToast = useCallback((id: number) => {
    setToasts((oldToasts) =>
      oldToasts.filter((toast: ToastCreateType) => toast.id !== id),
    );
  }, []);

  useEffect(() => {
    bind(createToast);
  }, [bind, createToast]);

  return (
    <div className='fixed bottom-24 right-[calc(50%-160px)] z-50'>
      {toasts.map(
        ({ id, message, duration, type, backgroundColor, icon, fontColor }) => (
          <ToastItem
            key={id}
            message={message}
            type={type}
            duration={duration || 2000}
            onDone={() => removeToast(id)}
            backgroundColor={backgroundColor}
            icon={icon}
            fontColor={fontColor}
          />
        ),
      )}
    </div>
  );
};

export default ToastManager;
