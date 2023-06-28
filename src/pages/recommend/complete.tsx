import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { getBookDataByTitle } from '@/api/book';
import Header from '@/components/common/Header';
import RecommendResultModal from '@/components/recommend/RecommendResultModal';
import { selectRecommendResultModalAtom } from '@/recoil/modal';
import { RecommendBookResult } from '@/recoil/recommend';

const RecommendCompletePage = () => {
  const {
    title: bookTitle,
    reason,
    userRequest,
  } = useRecoilValue(RecommendBookResult);
  const [modal, setModal] = useRecoilState(selectRecommendResultModalAtom);
  const router = useRouter();

  const {
    data: recommendBookData,
    isError,
    isLoading,
  } = useQuery(['recommendBookData'], () => getBookDataByTitle(bookTitle), {
    enabled: !!bookTitle,
    cacheTime: 0,
  });

  if (isError) return <>로딩중입니다.</>;
  if (isLoading) return <>실패했습니다.</>;

  if (!recommendBookData.documents.length)
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <p>책을 찾지 못했어요! 다시 시도해주세요</p>
        <button
          className='text-white bg-main'
          onClick={() => {
            router.back();
          }}
        >
          돌아가기
        </button>
      </div>
    );

  const { authors, isbn, thumbnail, title } = recommendBookData.documents[0];

  const bookData = {
    authors,
    isbn: isbn.split(' ')[0],
    thumbnail,
    title,
    reason,
  };

  return (
    <div className='flex flex-col items-center justify-between h-full px-8 bg-[url(/images/bookRecommend/background3.svg)] bg-no-repeat bg-cover bg-center'>
      <Header className='flex-initial pl-0 mt-14' />
      <div className='flex-initial w-full'>
        <h2 className='mb-5 text-lg font-semibold text-center'>나의 답변</h2>
        <p className='w-full text-center border-b'>
          &quot;{userRequest}&ldquo;
        </p>
      </div>
      <div className='flex-[6_6_300px] w-full flex items-center justify-center'>
        <div className='relative w-5/6 h-4/6 bg-white border-dashed border border-[#707070] rounded-2xl flex justify-center items-center flex-col'>
          <div className='mb-14'>
            <p className='text-6xl text-[#C2C1C180] font-bold mb-4 text-center'>
              ?
            </p>
            <p className='text-xl text-[#333333] font-semibold'>
              나에게 맞는 책은
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => setModal(true)}
        className='w-full flex-initial text-white rounded-lg h-14 bg-main disabled:bg-[#DFDFDF] mb-10'
      >
        확인하기
      </button>
      {modal && <RecommendResultModal bookData={bookData} />}
    </div>
  );
};

export default RecommendCompletePage;
