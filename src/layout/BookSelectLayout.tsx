import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

function BookSelectLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <section className='min-h-screen flex flex-col gap-6 pt-24 px-6 py-0 bg-[#ffffff]'>
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
      <div className='fixed flex s:w-[575px] h-[5.7rem] justify-center items-center w-full bg-[#ffffff]  -translate-x-2/4 left-2/4 bottom-0 border-t-[EBEAEA] border-t border-solid'>
        <button
          className='w-[90%] s:w-[517.5px] h-[3.6rem]  text-base text-white bg-[#DFDFDF] rounded-md border-[none]'
          disabled
        >
          책 등록
        </button>
      </div>
    </section>
  );
}

export default BookSelectLayout;
