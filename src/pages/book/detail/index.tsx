import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue } from 'recoil';

import { getBookDataByIsbnApi } from '@/api/book';
import { postBookshelfApi } from '@/api/bookshelf';
import { fetchRecord } from '@/api/record';
import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';
import { bookshelfDataProps } from '@/types/bookshelf';

const BookDetailPage = () => {
  const [ref, inView] = useInView();
  const [introductionHeight, setIntroductionHeight] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const introductionRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();
  const { openAuthRequiredModal } = useAuth();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);
  const { data: getBookDataByIsbn } = useQuery(
    ['getBookDataByIsbn', 'detail'],
    () => getBookDataByIsbnApi(router.query.isbn as string),
  );
  const {
    fetchNextPage,
    hasNextPage,
    data: getAllDetailRecords,
    status,
    isLoading,
  } = useInfiniteQuery(
    ['getAllDetailRecords', 'detail'],
    ({ pageParam = Number.MAX_SAFE_INTEGER }) =>
      fetchRecord(pageParam, 3, router.query.isbn as string),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.lastId) {
          return;
        }
        return lastPage.lastId;
      },
    },
  );

  const moveBookRecord = () => {
    if (!isAuthorized) return openAuthRequiredModal();

    router.push({
      pathname: '/book/record',
      query: {
        isbn: router.query.isbn,
      },
    });
  };

  const bookRelatedAllRecord = getAllDetailRecords?.pages.flatMap(
    (page) => page.records,
  );

  const postBookshelf = useMutation(postBookshelfApi);

  useEffect(() => {
    if (
      introductionRef.current &&
      introductionRef.current.offsetHeight > 65 &&
      !isLoading
    ) {
      setIntroductionHeight(true);
      setShowMore(true);
    } else {
      setIntroductionHeight(false);
      setShowMore(false);
    }
  }, [isLoading]);

  const getBookDataByIsnValid =
    getBookDataByIsbn &&
    getBookDataByIsbn.documents &&
    getBookDataByIsbn.documents[0];

  const onPutBook = () => {
    if (!isAuthorized) {
      openAuthRequiredModal();
      return;
    }

    let data: bookshelfDataProps;
    if (getBookDataByIsnValid) {
      data = {
        bookIsbn: router.query.isbn as string,
        title: getBookDataByIsbn.documents[0].title,
        thumbnail: getBookDataByIsbn?.documents[0].thumbnail,
        authors: getBookDataByIsbn?.documents[0].authors,
      };
    } else {
      return;
    }

    postBookshelf.mutate(data, {
      onSuccess: () => {
        alert('책 담기 성공');
      },
      onError: (error) => {
        const { status } = error as AxiosError;
        if (status === 403) {
          alert('이미 책장에 저장된 책입니다.');
        }
      },
    });
  };

  useEffect(() => {
    if (!getAllDetailRecords) return;
    if (hasNextPage && inView) fetchNextPage();
  }, [fetchNextPage, getAllDetailRecords, hasNextPage, inView]);

  useEffect(() => {
    if (!getBookDataByIsnValid) {
      router.push('/');
    }
  }, [getBookDataByIsnValid, router]);

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  return (
    <div className='flex flex-col'>
      {getBookDataByIsnValid && (
        <>
          <section className='flex flex-col items-center justify-center h-[30rem] border border-solid  bg-[#ffffff] gap-5'>
            <div className='w-full px-4'>
              <Image
                src='/images/detail/back.svg'
                alt='back'
                width={32}
                height={32}
                onClick={() => router.back()}
              />
            </div>

            <div className=' w-40 h-60 rounded-[0px_3px_3px_0px]  drop-shadow-xl'>
              <Image
                src={getBookDataByIsbn?.documents[0].thumbnail}
                alt='테스트'
                width='0'
                height='0'
                sizes='100vw'
                className='w-full h-auto'
              />
            </div>
            <article className='flex flex-col items-center gap-1 '>
              <h1 className='text-xl font-semibold text-[#242424]'>
                {getBookDataByIsbn?.documents[0].title}
              </h1>
              <h3 className='text-[13px]'>
                {getBookDataByIsbn?.documents[0].authors[0]} 지음
              </h3>
              <h4 className='text-[13px] text-[#999797]'>
                {getBookDataByIsbn?.documents[0].publisher}
              </h4>
            </article>
          </section>
          <section className='border p-5 pb-2 border-solid bg-[#ffffff]'>
            <h2 className='not-italic font-bold text-xl leading-[29px]  mb-4'>
              책 소개
            </h2>
            <p
              ref={introductionRef}
              className={`not-italic font-normal text-[15px] leading-[24px] text-justify text-[#707070] overflow-hidden  ${
                introductionHeight ? 'h-[45px]' : null
              }`}
            >
              {getBookDataByIsbn?.documents[0].contents}
            </p>
            {showMore ? (
              <div className='border-t-[#ebeaea] border-t border-solid mt-4 flex justify-center pt-2'>
                <button onClick={() => setIntroductionHeight((prev) => !prev)}>
                  {introductionHeight ? (
                    <Image
                      src='/images/detail/down-arrow.svg'
                      alt='down-arrow'
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Image
                      src='/images/detail/upper-arrow.svg'
                      alt='upper-arrow'
                      width={32}
                      height={32}
                    />
                  )}
                </button>
              </div>
            ) : null}
          </section>
        </>
      )}
      <section className='border p-5 pb-20 border-solid bg-[#ffffff]'>
        <h2 className='not-italic font-bold text-xl leading-[29px] mb-4'>
          관련 기록
        </h2>
        <ul className='flex flex-col '>
          {status === 'success' && (
            <>
              {bookRelatedAllRecord?.map((item) => (
                <Link
                  key={item.recordId}
                  href={{
                    pathname: '/book/feed',
                    query: {
                      recordId: item.recordId,
                      isbn: router.query.isbn as string,
                      type: 'DETAIL',
                    },
                  }}
                >
                  <li className='w-full flex justify-between px-0 py-4 border-b-[#ebeaea] border-b border-solid'>
                    <div className='flex flex-col justify-between w-9/12'>
                      <p className='text-[#333333] text-[13px]'>
                        {item.text.length >= 69
                          ? item.text.substring(0, 68) + '...'
                          : item.text}
                      </p>
                      <h3 className='text-[#707070] text-[13px]'>
                        @ {item.user.nickname}
                      </h3>
                    </div>
                    <div className='w-16 h-16 '>
                      <Image
                        src={item.recordImgUrl}
                        alt='테스트2'
                        width='0'
                        height='0'
                        sizes='100vw'
                        className='w-full h-auto'
                      />
                    </div>
                  </li>
                </Link>
              ))}
            </>
          )}
          <div ref={ref}></div>
        </ul>
      </section>
      <section className='flex justify-between items-center  w-full gap-2 p-2  bg-[#ffffff] border-solid border fixed bottom-0 s:w-[575px]'>
        <button
          className='flex justify-center items-center box-border w-1/3 h-16 shadow-[4px_4px_8px_rgba(0,0,0,0.15)] not-italic font-bold text-base leading-[19px] text-main rounded-md border-2 border-solid border-main pr-2'
          onClick={onPutBook}
        >
          <Image
            src='/images/detail/bookshelf.svg'
            alt='bookshelf'
            width={32}
            height={32}
          />
          담기
        </button>
        <button
          className='flex justify-center items-center box-border w-2/3 h-16 shadow-[4px_4px_8px_rgba(0,0,0,0.15)] not-italic font-bold text-base leading-[19px] text-[#ffffff] rounded-md border-2 border-solid border-main bg-main '
          onClick={moveBookRecord}
        >
          바로기록하기
        </button>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getBookDataByIsbn', 'detail'], () =>
    getBookDataByIsbnApi(context.query.isbn as string),
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default BookDetailPage;
