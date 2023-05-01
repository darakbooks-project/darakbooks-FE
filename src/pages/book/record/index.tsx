import { useRouter } from 'next/router';
import React from 'react';

const BookRecordPage = () => {
  const {
    query: { bid },
  } = useRouter();

  return (
    <div className='h-screen p-5 border-2 border-red-500'>
      <div className='h-1/5 border-basic flex flex-row '>
        <div className='w-1/3 border-basic'>IMAGE</div>
        <div className='flex flex-col justify-around pl-5'>
          <button className='border-basic' disabled={bid !== undefined}>
            책 선택
          </button>
          <div className='border-basic'>읽은날짜</div>
        </div>
      </div>
      <form className='h-4/5 border-basic flex flex-col items-center space-y-5'>
        <label
          htmlFor='book-image'
          className='flex border-basic w-full h-1/4 mt-5 justify-center items-center'
        >
          이미지를 선택해주세요
        </label>
        <input type='file' id='book-image' className='hidden' />
        <textarea className='border-basic w-full resize-none h-2/4'></textarea>
        <div className='border-basic w-full'>태그들</div>
        <div className='flex justify-end w-full'>
          <button className='border-basic'>비공개</button>
        </div>
      </form>
    </div>
  );
};

export default BookRecordPage;
