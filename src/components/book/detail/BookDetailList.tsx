import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { BooksProps, fetchDummy } from '@/pages/book/detail';

import BookDetailItem from './BookDetailItem';

const BookDetailList = () => {
  const { data: bookdetailList } = useQuery<BooksProps[]>(
    ['bookList'],
    fetchDummy,
  );

  return (
    <section className='grid grid-cols-3 4 gap-1 overflow-scroll'>
      {bookdetailList?.map((item) => (
        <BookDetailItem key={item.id} title={item.title} />
      ))}
    </section>
  );
};

export default BookDetailList;
