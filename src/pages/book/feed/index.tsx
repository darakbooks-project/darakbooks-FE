import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { fetchRecord } from '@/api/main';
import { getAllMainDetailRecordsApi } from '@/api/record';
import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import BottomNav from '@/components/common/BottomNav';
import { getAllMainDetailRecordsProps } from '@/types/record';

const BookDetailFeed = () => {
  const router = useRouter();
  let page = parseInt(router.query.recordId as string);

  const { status: getAllDetailRecordsStatus, data: getAllDetailRecordsData } =
    useQuery(
      ['getAllDetailRecords', 'record', page],
      () => getAllMainDetailRecordsApi(router.query.isbn as string, page, 1),
      {
        enabled: !!router.query.isbn,
      },
    );

  const { status: getAllRecordsStatus, data: getAllRecordsData } =
    useQuery<getAllMainDetailRecordsProps>(
      ['getAllRecords', 'feed', page],
      () => fetchRecord(page, 1),
      {
        enabled: !router.query.isbn,
      },
    );

  const status =
    getAllDetailRecordsStatus !== 'success'
      ? getAllRecordsStatus
      : getAllDetailRecordsStatus;
  const data = getAllDetailRecordsData
    ? getAllDetailRecordsData
    : getAllRecordsData;

  const nextPage = () => {
    // 마지막 데이터 판별 로직 필요
    page++;
    if (router.query.isbn) {
      router.push(`/book/feed?recordId=${page}&isbn=${router.query.isbn}`);
    } else {
      router.push(`/book/feed?recordId=${page}`);
    }
  };

  const prevPage = () => {
    // 첫번째 데이터 반별 로직 필요
    page--;
    if (router.query.isbn) {
      router.push(`/book/feed?recordId=${page}&isbn=${router.query.isbn}`);
    } else {
      router.push(`/book/feed?recordId=${page}`);
    }
  };

  return (
    <AuthRequiredPage>
      <div className='flex flex-col bg-[#fbfbfb] gap-4 py-16'>
        {status === 'success' && data && (
          <>
            <section className='flex items-center justify-center '>
              <button onClick={prevPage}>&lt;</button>
              <div className='text-[15px] text-[#232323] px-4'>
                {data.records[0].readAt.substring(0, 10).replaceAll('-', '.')}
              </div>
              <button onClick={nextPage}>&gt;</button>
            </section>
            <section className='w-full h-10 flex justify-between items-center px-6'>
              <article className='flex items-center'>
                <Image
                  src={data.records[0].user.photoUrl}
                  alt='프로필 이미지'
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='h-10 w-10 mr-2 rounded-[50%] '
                />

                <h3>{data?.records[0].user.nickname}</h3>
              </article>
            </section>
            <Image
              src={data.records[0].recordImgUrl}
              alt='피드 이미지'
              width='0'
              height='0'
              sizes='100vw'
              className='w-full h-[22rem]'
            />
            <article className='w-full leading-[160%] text-[15px] rounded-md px-6'>
              {data.records[0].text}
            </article>
            <ul className='inline-flex w-full flex-wrap px-6'>
              {data.records[0].tags.map((tag) => (
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
                  query: { isbn: router.query.isbn },
                }}
              >
                <article className=' flex gap-4 p-4 rounded-md bg-[#ffffff]'>
                  <div className='w-1/5'>
                    <Image
                      src={data.records[0].book.thumbnail}
                      alt='책 표지'
                      width='0'
                      height='0'
                      sizes='100vw'
                      className='w-full h-auto'
                    />
                  </div>
                  <div className='w-4/5 flex flex-col justify-evenly'>
                    <h1 className='text-base'>{data.records[0].book.title}</h1>
                    <h3 className='text-[13px] text-[#999797]'>
                      {data.records[0].book.authors[0]}
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

  if (context.query.isbn) {
    await queryClient.prefetchQuery(
      [
        'getBookDataByIsbn',
        'record',
        parseInt(context.query.recordId as string),
      ],
      () =>
        getAllMainDetailRecordsApi(
          context.query?.isbn as string,
          parseInt(context.query.recordId as string),
          1,
        ),
    );
  } else {
    await queryClient.prefetchQuery(
      ['getAllRecords', 'feed', parseInt(context.query.recordId as string)],
      () => fetchRecord(parseInt(context.query.recordId as string), 1),
    );
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default BookDetailFeed;
