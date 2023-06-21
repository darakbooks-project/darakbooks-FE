import Image from 'next/image';
import React from 'react';

import Header from '@/components/common/Header';

const RecommendLoading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full bg-background'>
      <Header className='absolute top-6' />
      <Image
        src='/images/bookRecommend/recommendCharacter.png'
        width={187}
        height={155}
        alt='책 추천 캐릭터'
      />
      <h2 className='w-3/4 mb-3 text-3xl font-semibold text-center text-[#333333]'>
        나에게 딱 맞는 책을 찾는 중이에요!
      </h2>
      <h3 className='w-3/4 text-[#707070] text-base text-center font-semibold'>
        거의 다 됐어요! 조금만 기다려주세요
      </h3>
    </div>
  );
};

export default RecommendLoading;
