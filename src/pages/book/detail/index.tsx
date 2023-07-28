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
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue } from 'recoil';

import { getBookDataByIsbnApi } from '@/api/book';
import { postBookshelfApi } from '@/api/bookshelf';
import { fetchRecord } from '@/api/record';
import Seo from '@/components/common/Seo';
import { useAuth } from '@/hooks/useAuth';
import useRememberScroll from '@/hooks/useRememberScroll';
import { isAuthorizedSelector } from '@/recoil/auth';
import { bookshelfDataProps } from '@/types/bookshelf';
import { suitableDescriptionHandler } from '@/utils/helpers/suitableDescriptionHandler';

const BookDetailPage = () => {
  const [ref, inView] = useInView();
  const [introductionHeight, setIntroductionHeight] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const introductionRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();
  const { openAuthRequiredModal } = useAuth();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);
  const { currentScroll, resetScroll, setScroll } = useRememberScroll('detail');
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

  useEffect(() => {
    if (currentScroll) {
      resetScroll();
    }
  }, []);

  useEffect(() => {
    if (currentScroll) {
      window.scrollTo(0, Number(currentScroll));
    }
  }, [currentScroll]);

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

  const onRecordClick = (recordId: number, isbn: string, type: string) => {
    if (!isAuthorized) {
      openAuthRequiredModal();
      return;
    }
    setScroll();
    router.push({
      pathname: '/book/feed',
      query: {
        recordId,
        isbn,
        type,
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

  const { title, contents, thumbnail, authors, publisher } =
    getBookDataByIsbn!.documents[0];

  const suitableDescription = suitableDescriptionHandler(contents);

  return (
    <div className='flex flex-col gap-1.5'>
      <Seo
        title={`다락책방 | ${title}`}
        description={`${suitableDescription}...`}
        image={thumbnail}
      />
      {getBookDataByIsnValid && (
        <>
          <section className='flex flex-col items-center justify-center h-[30rem] border border-solid bg-background gap-5'>
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
                src={thumbnail}
                alt='테스트'
                width='160'
                height='232'
                priority
              />
            </div>
            <article className='flex flex-col items-center gap-1 '>
              <h1 className='text-xl font-semibold text-[#242424] text-center px-5'>
                {title}
              </h1>
              <h3 className='text-[13px]'>
                {authors[0] ? authors[0] + ' 지음' : ''}
              </h3>
              <h4 className='text-[13px] text-[#999797]'>{publisher}</h4>
            </article>
          </section>
          <section className='border p-5 pb-2 border-solid bg-[#ffffff]'>
            <h2 className='not-italic font-bold text-xl leading-[29px]  mb-4'>
              책 소개
            </h2>
            <p
              ref={introductionRef}
              className={`not-italic font-normal text-[15px] leading-[24px] text-justify text-textGray overflow-hidden  ${
                introductionHeight ? 'h-[45px]' : null
              }`}
            >
              {contents}...
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
          이 책을 읽고
        </h2>
        <ul className='flex flex-col '>
          {status === 'success' && bookRelatedAllRecord!.length > 0 ? (
            <>
              {bookRelatedAllRecord?.map((item) => (
                <div
                  key={item.recordId}
                  onClick={() =>
                    onRecordClick(
                      item.recordId,
                      router.query.isbn as string,
                      'DETAIL',
                    )
                  }
                >
                  <li className='w-full flex justify-between px-0 py-4 border-b-[#ebeaea] border-b border-solid'>
                    <div className='flex flex-col justify-between w-9/12'>
                      <p className='text-textBlack text-[13px]'>
                        {item.text.length >= 69
                          ? item.text.substring(0, 68) + '...'
                          : item.text}
                      </p>
                      <h3 className='text-textGray text-[13px]'>
                        @ {item.user.nickname}
                      </h3>
                    </div>

                    <Image
                      src={item.recordImgUrl}
                      alt='테스트2'
                      width={64}
                      height={64}
                      className='w-16 h-16'
                    />
                  </li>
                </div>
              ))}
            </>
          ) : (
            <div className='flex flex-col justify-center items-center h-[18rem]'>
              <span className='text-lg text-textBlack'>
                독서 기록이 없어요.
              </span>
              <span className='text-sm text-textGray'>
                가장 먼저 기록을 남겨보세요!
              </span>
            </div>
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
