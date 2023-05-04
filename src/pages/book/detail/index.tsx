import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import BookDetailList from '@/components/book/detail/BookDetailList';

export interface BookListProps {
  books: {
    id: string;
    title: string;
  }[];
}

export interface BooksProps {
  id: string;
  title: string;
  description: string;
}

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
        <BookDetailList />
      </main>
    </div>
  );
};

export const fetchDummy = async () => {
  const resposne = await axios.get(
    'https://dummy-cca81-default-rtdb.asia-southeast1.firebasedatabase.app/books.json',
  );
  const formatBooks: BooksProps[] = [];
  for (const key in resposne.data) {
    formatBooks.push({
      id: key,
      title: resposne.data[key].title,
      description: resposne.data[key].description,
    });
  }
  return formatBooks;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['bookList'], fetchDummy);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default BookDetailPage;
