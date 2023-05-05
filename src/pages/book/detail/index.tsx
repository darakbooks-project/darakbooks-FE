import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';

import BookDescription from '@/components/book/detail/BookDescription';
import BookList from '@/components/book/detail/BookList';
import Buttons from '@/components/book/detail/Buttons';

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
  return (
    <div className='h-screen p-5 border-2 border-red-500'>
      <main className='h-full flex flex-col gap-5'>
        <BookDescription />
        <Buttons />
        <BookList />
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
