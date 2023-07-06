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
    <div className='h-full'>
      <div className='flex flex-col items-center px-7 justify-between h-full bg-[url(/images/bookRecommend/background1.svg)] bg-no-repeat bg-cover bg-center'>
        <Header className='pt-12 pl-0' />
        <section>
          <h1 className='mb-3 font-medium text-center text-clamp2xl text-main'>
            어떤 책을 추천해드릴까요?
          </h1>
          <h3 className='text-[#707070] text-center pb-5 text-clampSm'>
            안녕하세요! 똑똑한 독서 메이트 00 입니다. <br /> 나에게 맞는 책을
            추천해드릴게요!
          </h3>
          <div className='flex justify-center'>
            <Image
              src='/images/bookRecommend/recommendGuideCharacter.svg'
              width={290}
              height={180}
              alt='책 추천 캐릭터'
            />
          </div>
        </section>
        <div className='w-full'>
          <button
            onClick={() => router.push('/recommend/userinput', '/recommend')}
            className='w-full mb-10 text-white rounded-lg h-14 bg-main'
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookRecommendGuide;
