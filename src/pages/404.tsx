import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

function NotFound() {
  const { push } = useRouter();
  const goHome = () => {
    push('/');
  };
  return (
    <div className='h-screen flex items-center bg-[#FFFEF8]'>
      <div className='flex flex-col items-center justify-between w-full h-[29rem]'>
        <Image
          src='/images/notfound/not-found.svg'
          alt='not-found'
          width={180}
          height={237}
        />
        <h5 className='text-2xl font-[bold] text-[#60b28d]'>
          이곳은 들어갈 수 없어요!
        </h5>
        <p className='flex text-center text-[15px] text-[#707070]'>
          불편을 드려 죄송합니다. <br />
          홈페이지로 이동해 다양한 콘텐츠를 만나보세요:)
        </p>
        <button
          onClick={goHome}
          className='flex justify-center items-center text-white w-[21.875rem] h-[3.625rem] bg-[#60b28d] rounded-[10px]'
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
}

export default NotFound;
