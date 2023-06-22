import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { postBookshelfApi } from '@/api/bookshelf';
import Header from '@/components/common/Header';
import { isAuthorizedSelector } from '@/recoil/auth';
import { RecommendBookResult } from '@/recoil/recommend';
import { bookshelfDataProps } from '@/types/bookshelf';

const RecommendResultPage = () => {
  const isAuthorized = useRecoilValue(isAuthorizedSelector);
  const { mutate: postMyBookshelf } = useMutation(postBookshelfApi);
  const {
    Title,
    Author,
    ISBN,
    Image: bookImg,
    Intro,
    Reason,
  } = useRecoilValue(RecommendBookResult);
  const [addBookshelf, setAddBookshelf] = useState<bookshelfDataProps>({
    bookIsbn: '',
    authors: [],
    thumbnail: '',
    title: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (isAuthorized) {
      setAddBookshelf({
        bookIsbn: ISBN,
        authors: [Author],
        thumbnail: bookImg,
        title: Title,
      });
    }
  }, [Author, ISBN, Title, bookImg, isAuthorized]);

  const handleAddMyBookShelf = () => {
    postMyBookshelf(addBookshelf, {
      onSuccess: () => {
        alert('내 책장에 책을 담았습니다.');
      },
      onError: (error) => {
        const { status } = error as AxiosError;
        if (status === 403) {
          alert('이미 책장에 저장된 책입니다.');
        }
      },
    });
  };

  const handleMoveBookDetailPage = () => {
    router.push(`/book/detail?isbn=${ISBN}`);
  };

  const handleMoveMain = () => {
    router.push({
      pathname: '/',
      query: {
        isRendedOnboarding: 'true',
      },
    });
  };

  const changeBookButton = (isAuthorized: boolean) => {
    const loginUserButton = (
      <div className='flex justify-center mt-7'>
        <button
          onClick={handleAddMyBookShelf}
          className='flex items-center justify-center w-1/4 mr-3 border-2 rounded-lg h-14 border-main shadow-round text-main'
        >
          <Image
            src='/images/bookRecommend/bookshelfIcon.svg'
            width={32}
            height={32}
            alt='책장 아이콘'
          />
          담기
        </button>
        <button
          onClick={handleMoveBookDetailPage}
          className=' w-3/4 h-14 text-white rounded-lg bg-main disabled:bg-[#DFDFDF] shadow-round'
        >
          책 상세보기
        </button>
      </div>
    );

    const guestButton = (
      <button
        onClick={handleMoveMain}
        className='h-14 mt-7 text-white rounded-lg bg-main disabled:bg-[#DFDFDF] shadow-round'
      >
        책방 들어가기
      </button>
    );

    return isAuthorized ? loginUserButton : guestButton;
  };

  return (
    <div className='h-full bg-background'>
      <div className='flex flex-col items-center h-[27.625rem] p-5'>
        <Header className='pt-2 pl-0' />
        <Image
          src={bookImg}
          width={175}
          height={266}
          placeholder='blur'
          blurDataURL={bookImg}
          alt='추천 책 표지'
          className='rounded-r max-w-[10.9375rem] max-h-[16.625rem] w-full h-full xs:px-1 drop-shadow-around'
        />
      </div>
      <div className='flex flex-col justify-between bg-white absolute bottom-0 top-96 rounded-t-[1.875rem] px-5 pb-10 shadow-roundY w-full max-w-[36rem] min-h-[25rem]'>
        <div>
          <h1 className='pb-1 text-2xl font-semibold text-center text-main pt-11'>
            {Title}
          </h1>
          <h5 className='text-center text-[#707070] pb-7'>{Author}</h5>
          <p>{Reason}</p>
        </div>
        {changeBookButton(isAuthorized)}
      </div>
    </div>
  );
};

export default RecommendResultPage;
