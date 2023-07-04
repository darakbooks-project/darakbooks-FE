import Image from 'next/image';
import { useEffect } from 'react';

export const LoadingSpinner = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, []);

  return (
    <div className='w-full h-full max-w-xl fixed mx-auto top-0 bottom-0 z-40 flex justify-center items-center overflow-hidden'>
      <Image src='/images/loading.svg' width={80} height={80} alt='로딩' />
    </div>
  );
};
