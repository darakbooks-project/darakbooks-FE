import React from 'react';

const DUMMY = [
  '하이',
  '자투리시간',
  '자투리시간',
  '옹',
  '자투리시간',
  '잉',
  '허허허',
];

const BookRecordPage = () => {
  return (
    <div className='flex flex-col'>
      <section className='flex flex-col p-4 gap-8 pt-28 border-b-[#dfdfdf] border-b border-solid'>
        <article className='flex flex-col gap-2'>
          <h3 className='italic font-normal text-base leading-[19px] text-[#333333]'>
            2023.05.27
          </h3>
          <h1 className='italic font-normal text-[32px] leading-[38px] text-[#333333]'>
            독서 기록
          </h1>
        </article>
        <section className='flex flex-col gap-4'>
          <div>
            <button className='flex flex-col w-full justify-center items-center h-24 border rounded-md border-dashed border-[#c2c1c1]'>
              <span>+</span>
              <span className='text-[12]'>책 등록하기</span>
            </button>
          </div>
          <div className='flex justify-end'>
            <button className='flex justify-center items-center w-20 h-8 border rounded-[50px] border-solid border-[#c1c1c1]'>
              완독일 &gt;
            </button>
          </div>
          <textarea
            className='flex min-h-[19rem] p-4 rounded-md resize-none bg-[#fff8cb33]'
            placeholder='나의 독서 기록을 공유해보세요'
          ></textarea>
          <div>
            <label
              htmlFor='record-image'
              className='flex justify-center items-center w-[4.5rem] h-[4.5rem] rounded-md bg-[#dfdfdf]'
            >
              +
            </label>
            <input
              type='file'
              className='hidden'
              id='record-image'
              accept='image/*'
            />
          </div>
        </section>
      </section>
      <section className='flex flex-col justify-center gap-4 p-4'>
        <h2 className='not-italic font-bold text-sm leading-5 text-[#333333]'>
          해시태그 추가하기
        </h2>
        <div className=' w-full flex flex-wrap gap-2'>
          {DUMMY.map((item) => (
            <span
              key={item}
              className='inline-flex border italic font-normal text-sm leading-[17px] text-[#333333] px-3 py-1.5 rounded-[50px] border-solid border-[#ebeaea]'
            >
              #{item} <span className='ml-2'>X</span>
            </span>
          ))}
          <input
            className='w-auto inline-flex cursor-text  border italic font-normal text-sm leading-[17px] text-[#333333] px-3 py-1.5 rounded-[50px] border-solid border-[#ebeaea]'
            placeholder='# 태그입력'
          />
        </div>
        <button className='h-14 bg-inherit border rounded-md border-solid border-[#333333]'>
          기록하기
        </button>
      </section>
    </div>
  );
};

export default BookRecordPage;
