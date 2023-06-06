import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import { getBookDataByIsbnApi } from '@/api/book';
import { getBookDataByIsbnProps } from '@/types/book';

const DUMMY = [
  { id: '1', description: '하이하이', nickname: '하이1' },
  { id: '2', description: '바이바이', nickname: '바이1' },
];

const BookDetailPage = () => {
  const router = useRouter();
  const { data: getBookDataByIsbn } = useQuery<getBookDataByIsbnProps>(
    ['getBookDataByIsbn', 'detail'],
    () => getBookDataByIsbnApi(router.query.isbn as string), // 여기 넣어주기 router.query.isbn as string
  );

  const [pHeight, setPHeight] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.offsetHeight > 65) {
      setPHeight(true);
      setShowMore(true);
    } else {
      setPHeight(false);
      setShowMore(false);
    }
  }, []);

  return (
    <div className='flex flex-col gap-1'>
      <section className='h-[30rem] border border-solid  bg-[#ffffff]'>
        <div className='absolute w-44 h-64 left-[calc(50%_-_170px_/_2)] rounded-[0px_3px_3px_0px] top-[95px] drop-shadow-xl'>
          {getBookDataByIsbn && (
            <Image
              src={getBookDataByIsbn?.documents[0].thumbnail}
              alt='테스트'
              width='0'
              height='0'
              sizes='100vw'
              className='w-full h-auto'
            />
          )}
        </div>
        <article className='absolute w-[175px] h-[74px] left-[calc(50%_-_175px_/_2_+_0.5px)] flex flex-col items-center gap-[5px] top-[370px]'>
          <h1 className='text-xl font-semibold'>
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
          ref={ref}
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
      <section className='border p-5 border-solid bg-[#ffffff]'>
        <h2 className='not-italic font-bold text-xl leading-[29px] mb-4'>
          관련 기록
        </h2>
        <ul className='flex flex-col items-center'>
          {DUMMY.map((item) => (
            <li
              className='w-full flex justify-between mb-4 px-0 py-4 border-b-[#ebeaea] border-b border-solid'
              key={item.id}
            >
              <div className='flex flex-col justify-between w-9/12'>
                <p className='text-[#333333] text-[13px]'>{item.description}</p>
                <h3 className='text-[#707070] text-[13px]'>
                  @ {item.nickname}
                </h3>
              </div>
              <div className='border w-16 h-16 border-solid border-[blue]'>
                <Image
                  src=''
                  alt='테스트2'
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='w-full h-auto'
                />
              </div>
            </li>
          ))}
        </ul>
        <section className='flex justify-between items-center w-full gap-2  bg-[#ffffff]'>
          <button className='flex justify-center items-center box-border w-1/3 h-16 shadow-[4px_4px_8px_rgba(0,0,0,0.15)] not-italic font-bold text-base leading-[19px] text-[#5a987d] rounded-md border-2 border-solid border-[#5a987d]'>
            담기
          </button>
          <button className='flex justify-center items-center box-border w-2/3 h-16 shadow-[4px_4px_8px_rgba(0,0,0,0.15)] not-italic font-bold text-base leading-[19px] text-[#ffffff] rounded-md border-2 border-solid border-[#5a987d] bg-[#5a987d]'>
            바로기록하기
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
