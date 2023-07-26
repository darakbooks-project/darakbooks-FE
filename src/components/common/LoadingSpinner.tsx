import Image from 'next/image';
import { useEffect } from 'react';

const LoadingSpinner = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, []);

  return (
    <div className='fixed top-0 bottom-0 z-40 flex items-center justify-center w-full h-full max-w-xl mx-auto overflow-hidden'>
      <Image src='/images/loading.svg' width={80} height={80} alt='로딩' />
    </div>
  );
};

export default LoadingSpinner;
