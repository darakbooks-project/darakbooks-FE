import { useRouter } from 'next/router';
import React from 'react';

const BookDetailPage = () => {
  const router = useRouter();
  return (
    <div className='h-screen p-5 border-2 border-red-500'>
      <main className='h-full flex flex-col gap-5'>
        <section className='min-h-[10rem] flex'>
          <figure className='w-[30%] border-basic'>이미지</figure>
          <div className='w-[70%] flex flex-col pl-1'>
            <div className='flex  mb-2'>
              <h1 className='border-basic'>책명</h1>
              <h2 className='border-basic'>저자</h2>
            </div>
            <article className='h-full text-xs border-basic'>
              책내용 사이즈보고 ... 잘라내기 책내용 사이즈보고 ... 잘라내기
              책내용 사이즈보고 ... 잘라내기 책내용 사이즈보고 ... 잘라내기
              책내용 사이즈보고 ... 잘라내기
            </article>
          </div>
        </section>
        <section className='border-basic flex justify-end'>
          <button className='border-basic'>책장에 담기</button>
          <button
            className='border-basic'
            onClick={() => {
              router.push({
                pathname: 'record',
                query: { bid: '도서아이디' },
              });
            }}
          >
            독서기록
          </button>
        </section>
        <section className='border-basic'>
          <div>태그들</div>
        </section>
        <section className='grid grid-cols-3 4 gap-1 overflow-scroll'>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
          <div className='min-h-[8rem] border-basic'>1</div>
        </section>
      </main>
    </div>
  );
};

export default BookDetailPage;
