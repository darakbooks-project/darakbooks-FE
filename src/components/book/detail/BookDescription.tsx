import React from 'react';

const BookDescription = () => {
  return (
    <section className='min-h-[10rem] flex'>
      <figure className='w-[30%] border-basic'>이미지</figure>
      <div className='w-[70%] flex flex-col pl-1'>
        <div className='flex  mb-2'>
          <h1 className='border-basic'>책명</h1>
          <h2 className='border-basic'>저자</h2>
        </div>
        <article className='h-full text-xs border-basic'>
          책내용 사이즈보고 ... 잘라내기 책내용 사이즈보고 ... 잘라내기 책내용
          사이즈보고 ... 잘라내기 책내용 사이즈보고 ... 잘라내기 책내용
          사이즈보고 ... 잘라내기
        </article>
      </div>
    </section>
  );
};

export default BookDescription;
