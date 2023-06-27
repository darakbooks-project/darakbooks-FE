import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { postGPTRecommendBook } from '@/api/recommend';
import Header from '@/components/common/Header';
import RecommendLoading from '@/components/recommend/RecommendLoading';
import { RecommendBookResult } from '@/recoil/recommend';

const RecommendInputPage = () => {
  const [userRequest, setUserRequest] = useState('');
  const router = useRouter();
  const setRecommend = useSetRecoilState(RecommendBookResult);

  const {
    mutate: postGPTRecommend,
    isLoading,
    isError,
  } = useMutation(postGPTRecommendBook);

  const handleChangeRequestInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserRequest(e.target.value);
  };

  const handlePostGPTRecommend = () => {
    const userInput = {
      userInput: userRequest,
    };

    postGPTRecommend(userInput, {
      onSuccess: (data) => {
        setRecommend({
          title: data.title,
          reason: data.reason,
          userRequest,
        });
        router.push('/recommend/complete', '/');
      },
    });
  };

  if (isLoading) {
    return <RecommendLoading />;
  }
  if (isError) return <></>;

  return (
    <div className='flex flex-col items-center justify-between h-full p-5 bg-[url(/images/bookRecommend/background2.svg)] bg-no-repeat bg-cover bg-center'>
      <Header className='pt-2 pl-0' />
      <main className='relative w-full h-full m-3'>
        <h2 className='mb-5 text-lg font-semibold'>
          아래와 같은 답변을 해주세요
        </h2>
        <Image
          src='/images/bookRecommend/recommendCharacter.svg'
          width={73}
          height={90}
          alt='책 추천 캐릭터'
          className='absolute right-0 -top-5'
        />
        <textarea
          value='요새 우울한데 현실에서 벗어날 수 있는 재밌는 추리 소설 추천해줘. 한 100페이지 정도 되는!'
          readOnly
          className='w-full h-[18%] border border-[#C2C1C1] rounded-md py-6 px-4 resize-none mb-7 xs:h-[26%] xxs:h-[30%]'
        />
        <textarea
          value={userRequest}
          onChange={handleChangeRequestInput}
          placeholder='현재의 상황, 기분, 원하는 책의 종류, 내용 등 떠오르는대로 자유롭게 입력해주세요:)'
          className='w-full h-[40%] border border-[#C2C1C1] rounded-md py-6 px-4 resize-none'
        />
      </main>
      <button
        disabled={!userRequest}
        onClick={handlePostGPTRecommend}
        className='w-full text-white rounded-lg h-14 bg-main disabled:bg-[#DFDFDF]'
      >
        추천 받기
      </button>
    </div>
  );
};

export default RecommendInputPage;
