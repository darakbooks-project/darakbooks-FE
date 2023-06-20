import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { fetchRecord } from '@/api/record';
import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import BottomNav from '@/components/common/BottomNav';

const BookDetailFeed = () => {
  const {
    query: { type, recordId, isbn },
    push,
  } = useRouter();
  const maxNumber = Number.MAX_SAFE_INTEGER;

  const { data: mainData, status: mainStatus } = useQuery(
    ['AllDataFromMain'],
    () => fetchRecord(maxNumber, maxNumber),
    {
      enabled: !!(type === 'MAIN' && !isbn),
    },
  );

  const { data: detailData, status: detailStatus } = useQuery(
    ['AllDataFromDetail'],
    () => fetchRecord(maxNumber, maxNumber, isbn as string),
    {
      enabled: !!(type === 'DETAIL' && isbn),
    },
  );

  const data = useMemo(() => {
    switch (type) {
      case 'MAIN': {
        return mainData;
      }
      case 'DETAIL': {
        return detailData;
      }
    }
  }, [detailData, mainData, type]);

  const status = useMemo(() => {
    switch (type) {
      case 'MAIN': {
        return mainStatus;
      }
      case 'DETAIL': {
        return detailStatus;
      }
    }
  }, [detailStatus, mainStatus, type]);
  // 두개 합치기

  const currentData = data?.records.find(
    (item) => item.recordId === parseInt(recordId + ''),
  );
  const currentIndex = data?.records.findIndex((item) => item === currentData);
  const dataSize = data?.records.length;

  const nextPage = () => {
    if (currentIndex === parseInt(dataSize + '') - 1) {
      return;
    }
    const nextRecordId = data?.records[currentIndex! + 1].recordId;
    switch (type) {
      case 'MAIN': {
        push({
          pathname: '/book/feed',
          query: {
            recordId: nextRecordId,
            type: 'MAIN',
          },
        });
        break;
      }
      case 'DETAIL': {
        push({
          pathname: '/book/feed',
          query: {
            recordId: nextRecordId,
            isbn,
            type: 'DETAIL',
          },
        });
        break;
      }
    }
  };

  const prevPage = () => {
    if (currentIndex === 0) {
      return;
    }
    const nextRecordId = data?.records[currentIndex! - 1].recordId;
    switch (type) {
      case 'MAIN': {
        push({
          pathname: '/book/feed',
          query: {
            recordId: nextRecordId,
            type: 'MAIN',
          },
        });
        break;
      }
      case 'DETAIL': {
        push({
          pathname: '/book/feed',
          query: {
            recordId: nextRecordId,
            isbn,
            type: 'DETAIL',
          },
        });
        break;
      }
    }
  };

  return (
    <AuthRequiredPage>
      <div className='flex flex-col bg-[#fbfbfb] gap-4 py-16'>
        {status === 'success' && currentData && (
          <>
            <section className='flex items-center justify-center '>
              <button onClick={prevPage}>&lt;</button>
              <div className='text-[15px] text-[#232323] px-4'>
                {currentData.readAt.substring(0, 10).replaceAll('-', '.')}
              </div>
              <button onClick={nextPage}>&gt;</button>
            </section>
            <section className='w-full h-10 flex justify-between items-center px-6'>
              <article className='flex items-center'>
                <Image
                  src={currentData.user.photoUrl}
                  alt='프로필 이미지'
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='h-10 w-10 mr-2 rounded-[50%] '
                />

                <h3>{currentData.user.nickname}</h3>
              </article>
            </section>
            <Image
              src={currentData.recordImgUrl}
              alt='피드 이미지'
              width='0'
              height='0'
              sizes='100vw'
              className='w-full h-[22rem]'
            />
            <article className='w-full leading-[160%] text-[15px] rounded-md px-6'>
              {currentData.text}
            </article>
            <ul className='inline-flex w-full flex-wrap px-6'>
              {currentData.tags.map((tag) => (
                <li
                  className='flex justify-center items-center border font-normal text-[13px] text-[#333333] mr-2 px-3 py-[5px] rounded-[50px] border-solid border-[#ebeaea]'
                  key={tag.id}
                >
                  #{tag.data}
                </li>
              ))}
            </ul>
            <section className='flex flex-col w-full px-6 pb-6'>
              <h2 className='not-italic font-normal text-base text-[#242424] mb-4'>
                도서 정보
              </h2>
              <Link
                href={{
                  pathname: '/book/detail',
                  query: { isbn },
                }}
              >
                <article className=' flex gap-4 p-4 rounded-md bg-[#ffffff] mb-3'>
                  <div className='w-1/5'>
                    <Image
                      src={currentData.book.thumbnail}
                      alt='책 표지'
                      width='0'
                      height='0'
                      sizes='100vw'
                      className='w-full h-auto'
                    />
                  </div>
                  <div className='w-4/5 flex flex-col justify-evenly'>
                    <h1 className='text-base'>{currentData.book.title}</h1>
                    <h3 className='text-[13px] text-[#999797]'>
                      {currentData.book.authors[0]}
                    </h3>
                  </div>
                </article>
              </Link>
            </section>
          </>
        )}
        <BottomNav />
      </div>
    </AuthRequiredPage>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient();
  const maxNumber = Number.MAX_SAFE_INTEGER;

  switch (context.query.type) {
    case 'MAIN': {
      await queryClient.prefetchQuery(['AllDataFromMain'], () =>
        fetchRecord(maxNumber, maxNumber),
      );
      break;
    }
    case 'DETAIL': {
      await queryClient.prefetchQuery(['AllDataFromDetail'], () =>
        fetchRecord(maxNumber, maxNumber, context.query.isbn as string),
      );
      break;
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default BookDetailFeed;
