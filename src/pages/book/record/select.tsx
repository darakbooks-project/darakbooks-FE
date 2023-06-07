import Image from 'next/image';
import React from 'react';
import { ReactElement } from 'react';

import BookSelectLayout from '@/layout/BookSelectLayout';
import { NextPageWithLayout } from '@/types/layout';

const BookRecordSelectPage: NextPageWithLayout = () => {
  return (
    <>
      <div>
        <h5 className='text-[13px]'>
          전체 <span className='text-[#67a68a]'>6</span>권
        </h5>
      </div>
      <ul className='h-[90%] grid grid-cols-[repeat(3,1fr)] grid-rows-[repeat(4,1fr)] gap-4'>
        <li className='flex flex-col justify-center items-center h-48 bg-[rgba(182,245,217,0.15)] border p-2 rounded-lg border-solid border-[#67a68a]'>
          <div className='w-full h-[9.5rem] border mb-2.5 rounded-[0px_3px_3px_0px] border-solid border-[red] shadow-[0px_0px_7px_rgba(0,0,0,0.25)]'>
            <Image src='' alt='' />
          </div>
          <h2 className='w-full text-[13px] text-[#333333] mx-0 my-[5px] text-center'>
            긴긴밤
          </h2>
          <h3 className='w-full text-[11px] text-[#707070] text-center'>
            루리
          </h3>
        </li>
      </ul>
    </>
  );
};

BookRecordSelectPage.getLayout = function getLayout(page: ReactElement) {
  return <BookSelectLayout>{page}</BookSelectLayout>;
};

export default BookRecordSelectPage;
