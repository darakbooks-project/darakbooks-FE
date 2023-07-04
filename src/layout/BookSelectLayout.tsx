import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

import Header from '@/components/common/Header';

function BookSelectLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <section className='min-h-screen flex flex-col gap-5 pt-12 px-6  bg-[#ffffff]'>
      <Header className=' pl-0' />
      <div className='flex'>
        <Link
          href='/book/record/select'
          className={
            router.pathname === '/book/record/select'
              ? 'flex justify-center items-center w-6/12 text-main px-0 py-3 border-b-2 border-main border-solid'
              : 'flex justify-center items-center w-6/12 text-[#999797] px-0 py-3 border-b-2 border-b-[#f3f3f3] border-solid'
          }
        >
          내 책장
        </Link>
        <Link
          href='/book/record/search'
          className={
            router.pathname === '/book/record/search'
              ? 'flex justify-center items-center w-6/12 text-main px-0 py-3 border-b-2 border-main border-solid'
              : 'flex justify-center items-center w-6/12 text-[#999797] px-0 py-3 border-b-2 border-b-[#f3f3f3] border-solid'
          }
        >
          책 검색
        </Link>
      </div>
      {children}
    </section>
  );
}

export default BookSelectLayout;
