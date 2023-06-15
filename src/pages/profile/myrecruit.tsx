import Image from 'next/image';
import React, { ReactElement } from 'react';

import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/types/layout';

const myRecruit: NextPageWithLayout = () => {
  return (
    <main className='flex flex-col gap-12 px-6 py-16'>
      <section className='flex flex-col justify-center h-3/6'>
        <h3 className='font-medium text-[17px] text-[#333333] mb-2'>
          운영중인 모임
        </h3>
        <article className='w-full bg-white border flex flex-col gap-2 p-6 rounded-[10px] border-solid border-[#dfdfdf]'>
          <h4 className='text-[15px] text-[#333333] font-[bold]'>
            [미움받을 용기] 읽고 나눠요
          </h4>
          <div>
            <p className='text-[13px] text-[#707070]'>
              온라인 - 매주 토요일 14:00
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <div className='h-full flex'>
              <Image
                src=''
                alt=''
                width='0'
                height='0'
                className='w-6 h-6 bg-[#d9d9d9] border rounded-[50%] border-solid border-white'
              />
            </div>
            <span className='flex justify-center items-center w-[2.8rem] h-5 bg-[#67a68a] text-[11px] text-white rounded-[3px]'>
              모집중
            </span>
          </div>
        </article>
      </section>
      <section className='flex flex-col justify-center h-3/6 border-basic'>
        <h3 className='font-medium text-[17px] text-[#333333] mb-2'>
          참여중인 모임
        </h3>
        <article className='w-full bg-white border flex flex-col gap-2 p-6 rounded-[10px] border-solid border-[#dfdfdf]'>
          <h4 className='text-[15px] text-[#333333] font-[bold]'>
            [미움받을 용기] 읽고 나눠요
          </h4>
          <div>
            <p className='text-[13px] text-[#707070]'>
              온라인 - 매주 토요일 14:00
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <div className='h-full flex'>
              <Image
                src=''
                alt=''
                width='0'
                height='0'
                className='w-6 h-6 bg-[#d9d9d9] border rounded-[50%] border-solid border-white'
              />
            </div>
            <span className='flex justify-center items-center w-[2.8rem] h-5 bg-[#67a68a] text-[11px] text-white rounded-[3px]'>
              모집중
            </span>
          </div>
        </article>
      </section>
    </main>
  );
};

myRecruit.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default myRecruit;
