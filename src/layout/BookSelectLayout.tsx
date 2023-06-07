import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

function BookSelectLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <section className='h-screen bg-[#ffffff]'>
      <section className='flex flex-col gap-6 h-[90%] pt-24 px-6 py-0 '>
        <div className='flex'>
          <Link
            href='/book/record/select'
            className={
              router.pathname === '/book/record/select'
                ? 'flex justify-center items-center w-6/12 text-[#67a68a] px-0 py-3 border-b-2 border-[#67a68a] border-solid'
                : 'flex justify-center items-center w-6/12 text-[#999797] px-0 py-3 border-b-2 border-b-[#f3f3f3] border-solid'
            }
          >
            내 책장
          </Link>
          <Link
            href='/book/record/search'
            className={
              router.pathname === '/book/record/search'
                ? 'flex justify-center items-center w-6/12 text-[#67a68a] px-0 py-3 border-b-2 border-[#67a68a] border-solid'
                : 'flex justify-center items-center w-6/12 text-[#999797] px-0 py-3 border-b-2 border-b-[#f3f3f3] border-solid'
            }
          >
            책 검색
          </Link>
        </div>
        {children}
      </section>
      <section className='flex justify-center items-center h-[10%] px-4 py-0 border-t-[#ebeaea] border-t border-solid'>
        <button className='w-full flex justify-center items-center h-14 text-white bg-[#dfdfdf] z-40 rounded-md'>
          책 등록
        </button>
      </section>
    </section>
  );
}

export default BookSelectLayout;
