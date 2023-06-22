import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

import { RecommendBookResult } from '@/recoil/recommend';

import Header from '../common/Header';

const BookRecommendGuide = () => {
  const router = useRouter();
  const resultRecommendResult = useResetRecoilState(RecommendBookResult);

  useEffect(() => {
    resultRecommendResult();
  }, [resultRecommendResult]);

  return (
    <div className='flex flex-col items-center justify-between h-full bg-background'>
      <Header className='pt-12' />
      <section>
        <h1 className='text-2xl font-semibold text-[#33333] mb-3'>
          어떤 책을 추천해드릴까요?
        </h1>
        <h3 className='font-medium text-[#707070] text-center'>
          안녕하세요! 똑똑한 독서 메이트 00 입니다. <br /> 나에게 맞는 책을
          추천해드릴게요!
        </h3>
        <div className='flex justify-center'>
          <Image
            src='/images/bookRecommend/recommendCharacter.png'
            width={251}
            height={211}
            alt='책 추천 캐릭터'
          />
        </div>
      </section>
      <div className='w-full px-5'>
        <button
          onClick={() => router.push('/recommend/userinput', '/recommend')}
          className='w-full mb-10 text-white rounded-lg h-14 bg-main'
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default BookRecommendGuide;
