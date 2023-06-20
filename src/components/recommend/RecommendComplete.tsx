import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import Header from '@/components/common/Header';
const RecommendComplete = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center h-full bg-background'>
      <Header className='absolute top-6' />
      <div className='relative w-4/6 h-96 bg-white border-dashed border border-[#707070] rounded-2xl flex justify-center items-center flex-col'>
        <Image
          src='/images/bookRecommend/recommendCharacter.png'
          width={145}
          height={117}
          alt='책 추천 캐릭터'
          className='absolute -top-16'
        />
        <div className='mb-14'>
          <p className='text-6xl text-[#C2C1C180] font-bold mb-4 text-center'>
            ?
          </p>
          <p className='text-xl text-[#333333] font-semibold'>
            나에게 맞는 책은
          </p>
        </div>
        <button
          onClick={() => router.push('result', '/recommend')}
          className='absolute bottom-0 w-4/5 mb-10 text-white rounded-lg h-14 bg-main disabled:bg-[#DFDFDF] shadow-round'
        >
          확인하기
        </button>
      </div>
    </div>
  );
};

export default RecommendComplete;
