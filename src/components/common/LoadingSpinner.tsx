import Image from 'next/image';

export const LoadingSpinner = () => {
  return (
    <div className='w-full h-full max-w-xl fixed mx-auto left-0 top-0 bottom-0 right-0 z-40 flex justify-center items-center overflow-hidden'>
      <Image src='/images/loading.svg' width={80} height={80} alt='로딩' />
    </div>
  );
};
