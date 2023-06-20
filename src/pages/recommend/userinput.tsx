import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { getGPTRecommendBook } from '@/api/recommend';
import Header from '@/components/common/Header';
import RecommendComplete from '@/components/recommend/RecommendComplete';
import RecommendLoading from '@/components/recommend/RecommendLoading';
import RecommendLayout from '@/layout/RecommendLayout';
import { RecommendBookResult } from '@/recoil/recommend';

const RecommendInputPage = () => {
  const [userRequest, setUserRequest] = useState('');
  const setBookRecommendResult = useSetRecoilState(RecommendBookResult);
  const { data, refetch, isInitialLoading, isFetching, isSuccess } = useQuery(
    ['recommendGPT'],
    () => getGPTRecommendBook(userRequest),
    {
      enabled: false,
      cacheTime: 0,
    },
  );

  useEffect(() => {
    if (isSuccess) setBookRecommendResult(data);
  }, [setBookRecommendResult, data, isSuccess]);

  const handleChangeRequestInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserRequest(e.target.value);
  };

  if (isInitialLoading || isFetching) {
    return <RecommendLoading />;
  }

  if (isSuccess) {
    return <RecommendComplete />;
  }

  return (
    <div className='flex flex-col items-center justify-between h-full p-5 bg-background'>
      <Header className='pt-2 pl-0' />
      <main className='relative w-full h-full m-3'>
        <h2 className='mb-5 text-lg font-semibold'>
          아래와 같은 답변을 해주세요
        </h2>
        <Image
          src='/images/bookRecommend/recommendCharacter.png'
          width={99}
          height={82}
          alt='책 추천 캐릭터'
          className='absolute right-0 -top-5'
        />
        <textarea
          value='요새 우울한데 현실에서 벗어날 수 있는 재밌는 추리 소설 추천해줘. 한 100페이지 정도 되는!'
          readOnly
          className='w-full h-[27%]  border border-[#C2C1C1] rounded-md py-6 px-4 resize-none mb-7'
        />
        <textarea
          value={userRequest}
          onChange={handleChangeRequestInput}
          placeholder='현재의 상황, 기분, 원하는 책의 종류, 내용 등 떠오르는대로 자유롭게 입력해주세요:)'
          className='w-full h-[50%] border border-[#C2C1C1] rounded-md py-6 px-4 resize-none'
        />
      </main>
      <button
        disabled={!userRequest}
        onClick={() => refetch()}
        className='w-full text-white rounded-lg h-14 bg-main disabled:bg-[#DFDFDF]'
      >
        추천 받기
      </button>
    </div>
  );
};

RecommendInputPage.getLayout = function getLayout(page: ReactElement) {
  return <RecommendLayout>{page}</RecommendLayout>;
};

export default RecommendInputPage;
