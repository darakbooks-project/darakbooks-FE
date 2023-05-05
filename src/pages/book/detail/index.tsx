import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import { fetchDummy } from '@/api/dummy';
import BookDescription from '@/components/book/detail/BookDescription';
import BookList from '@/components/book/detail/BookList';
import Buttons from '@/components/book/detail/Buttons';

const BookDetailPage = () => {
  return (
    <div className='h-screen p-5 border-2 border-red-500'>
      {/* 디자인이 나오면 정확한 수치로 Layout컴포넌트 만들어 _app.tsx에 감싸주기 */}
      <main className='h-full flex flex-col gap-5'>
        <BookDescription />
        <Buttons />
        <BookList />
      </main>
    </div>
  );
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
