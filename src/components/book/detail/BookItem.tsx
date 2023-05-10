import React from 'react';

const BookItem = ({ title }: { title: string }) => {
  return <article className='min-h-[8rem] border-basic'>{title}</article>;
};

export default BookItem;