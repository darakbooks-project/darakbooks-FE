import React from 'react';

const BookDetailPage = () => {
  return (
    <div className='h-screen p-5 border-2 border-red-500'>
      <div className='h-full flex flex-col gap-5'>
        <div className='min-h-[10rem] flex'>
          <div className='w-[30%] border-basic'>이미지</div>
          <div className='w-[70%] flex flex-col pl-1'>
            <div className='flex justify-between mb-2'>
              <div className='flex'>
                <h1 className='border-basic'>책명</h1>
                <div className='border-basic'>저자</div>
              </div>
              <button className='border-basic'>책장에 담기</button>
            </div>
            <div className='h-full text-xs border-basic'>
              책내용 사이즈보고 ... 잘라내기 책내용 사이즈보고 ... 잘라내기
              책내용 사이즈보고 ... 잘라내기 책내용 사이즈보고 ... 잘라내기
              책내용 사이즈보고 ... 잘라내기
            </div>
          </div>
        </div>
        <div className='border-basic flex justify-end'>
          <button className='border-basic'>독서기록</button>
        </div>
        <div className='border-basic'>
          <div>태그들</div>
        </div>
        <div className='grid grid-cols-3 4 gap-1 overflow-scroll'>
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
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
