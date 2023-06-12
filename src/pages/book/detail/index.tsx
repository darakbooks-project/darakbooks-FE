import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import { getBookDataByIsbnApi } from '@/api/book';
import { postBookshelfApi } from '@/api/bookshelf';
import { getAllMainDetailRecordsApi } from '@/api/record';
import { getBookDataByIsbnProps } from '@/types/book';
import { bookshelfDataProps } from '@/types/bookshelf';

interface getAllMainDetailRecordsProps {
  recordId: number;
  text: string;
  recordImgUrl: string;
  tags: { id: number; data: string }[];
  readAt: string;
  book: {
    title: string;
    thumbnail: string;
    bookIsbn: string;
    authors: string[];
  };
  user: {
    userId: string;
    nickname: string;
    photoUrl: string;
  };
}

const BookDetailPage = () => {
  const [pHeight, setPHeight] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const pRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();
  const { data: getBookDataByIsbn } = useQuery<getBookDataByIsbnProps>(
    ['getBookDataByIsbn', 'detail'],
    () => getBookDataByIsbnApi(router.query.isbn as string),
  );
  const {
    fetchNextPage,
    hasNextPage,
    data: getAllDetailRecords,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<getAllMainDetailRecordsProps[]>(
    ['getAllDetailRecords', 'detail'],
    ({ pageParam = 1 }) =>
      getAllMainDetailRecordsApi('1234567890', pageParam, 8),
    {
      getNextPageParam: (lastPage) => {
        console.log(lastPage);
      },
    },
  );

  const postBookshelf = useMutation(postBookshelfApi);

  useEffect(() => {
    if (getAllDetailRecords) {
      console.log(getAllDetailRecords);
    }
  }, [getAllDetailRecords]);

  useEffect(() => {
    if (pRef.current && pRef.current.offsetHeight > 65) {
      setPHeight(true);
      setShowMore(true);
    } else {
      setPHeight(false);
      setShowMore(false);
    }
  }, []);

  const getBookDataByIsnValid =
    getBookDataByIsbn &&
    getBookDataByIsbn.documents &&
    getBookDataByIsbn.documents[0];

  const onPutBook = () => {
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
        alert(error);
      },
    });
  };

  // useEffect(() => {
  //   if (!getBookDataByIsnValid) {
  //     router.push('/');
  //   }
  // }, [getBookDataByIsnValid, router]);

  return (
    <div className='flex flex-col gap-1'>
      {getBookDataByIsnValid && (
        <>
          <section className='flex flex-col items-center justify-center h-[30rem] border border-solid  bg-[#ffffff] gap-5'>
            <div className='w-full px-4' onClick={() => router.back()}>
              &lt;
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
            <article className=' flex flex-col items-center gap-1'>
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
              ref={pRef}
              className={`not-italic font-normal text-[15px] leading-[24px] text-justify text-[#707070] overflow-hidden  ${
                pHeight ? 'h-[45px]' : null
              }`}
            >
              {getBookDataByIsbn?.documents[0].contents}
            </p>
            {showMore ? (
              <div className='border-t-[#ebeaea] border-t border-solid mt-4 flex justify-center pt-2'>
                <button onClick={() => setPHeight((prev) => !prev)}>
                  {pHeight ? '더보기' : '닫기'}
                </button>
              </div>
            ) : null}
          </section>
        </>
      )}
      <section className='border p-5 border-solid bg-[#ffffff]'>
        <h2 className='not-italic font-bold text-xl leading-[29px] mb-4'>
          관련 기록
        </h2>
        <ul className='flex flex-col items-center'>
          {status === 'success' && (
            <>
              {getAllDetailRecords.pages[0].map((item) => (
                <li
                  className='w-full flex justify-between mb-4 px-0 py-4 border-b-[#ebeaea] border-b border-solid'
                  key={item.recordId}
                >
                  <div className='flex flex-col justify-between w-9/12'>
                    <p className='text-[#333333] text-[13px]'>{item.text}</p>
                    <h3 className='text-[#707070] text-[13px]'>
                      @ {item.user.nickname}
                    </h3>
                  </div>
                  <div className='border w-16 h-16 border-solid border-[blue]'>
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
              ))}
            </>
          )}
        </ul>
        <section className='flex justify-between items-center w-full gap-2  bg-[#ffffff]'>
          <button
            className='flex justify-center items-center box-border w-1/3 h-16 shadow-[4px_4px_8px_rgba(0,0,0,0.15)] not-italic font-bold text-base leading-[19px] text-[#5a987d] rounded-md border-2 border-solid border-[#5a987d]'
            onClick={onPutBook}
          >
            담기
          </button>
          <button className='flex justify-center items-center box-border w-2/3 h-16 shadow-[4px_4px_8px_rgba(0,0,0,0.15)] not-italic font-bold text-base leading-[19px] text-[#ffffff] rounded-md border-2 border-solid border-[#5a987d] bg-[#5a987d]'>
            <Link
              href={{
                pathname: '/book/record',
                query: { isbn: router.query.isbn },
              }}
            >
              바로기록하기
            </Link>
          </button>
        </section>
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
