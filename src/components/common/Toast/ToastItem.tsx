import { useEffect, useState } from 'react';

import { ToastItemType } from '@/types/toast';
import { toastType } from '@/utils/constants/toast';

const ToastItem = ({
  message,
  duration,
  onDone,
  type,
  backgroundColor,
  icon,
  fontColor,
}: ToastItemType) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      onDone();
    }, duration);
  }, []);

  return (
    <div
      className='relative flex items-center h-full p-5 bg-white rounded opacity-100 w-80 shadow-toast first-of-type:animate-move [&:not(:first-of-type)]:mt-2'
      style={{
        opacity: show ? 1 : 0,
        backgroundColor: type
          ? toastType[type].backgroundColor
          : backgroundColor,
        color: fontColor,
      }}
    >
      <img
        src={type ? toastType[type].icon : icon}
        width={32}
        height={32}
        alt='토스트 아이콘'
      />
      <div className='flex flex-col ml-[0.5rem]'>
        <p
          className=' text-[0.9375rem] font-bold'
          style={{ color: `${type ? toastType[type].fontColor : fontColor}` }}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default ToastItem;
