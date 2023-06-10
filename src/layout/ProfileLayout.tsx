import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

function ProfileLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div className='h-screen'>
      <section className='w-full h-[30%] bg-[#fffef8] flex flex-col px-6 py-0'>
        <div className='flex items-center justify-end h-3/6'>
          <div>&gt;</div>
        </div>
        <article className='h-3/6 flex items-center justify-between'>
          <div>
            <h1 className='text-2xl text-[#333333] font-[bold] mb-[5px]'>
              문학소녀
            </h1>
            <p className='text-[13px] text-[#707070]'>
              좋아하는 것을 일고 기록해요 :)
              <Link href='/profile/edit'>수정</Link>
            </p>
          </div>
          <div className='w-[4.5rem] h-[4.5rem] bg-[#ebeaea] border rounded-[50%] border-solid border-[#c2c1c1]'>
            <Image src='' alt='' />
          </div>
        </article>
      </section>
      <section className='h-[70%]'>
        <nav className='grid grid-cols-[repeat(3,1fr)] h-14 border-t-[#ebeaea] border-t border-solid'>
          <Link
            href='/profile'
            className={
              router.pathname === '/profile'
                ? 'flex justify-center items-center text-sm text-[#67a68a] border-b-[#67a68a] border-b border-solid'
                : 'flex justify-center items-center text-sm text-[#999797] border-b-[#ebeaea] border-b border-solid'
            }
          >
            책장
          </Link>
          <Link
            href='/profile/myfeed'
            className={
              router.pathname === '/profile/myfeed'
                ? 'flex justify-center items-center text-sm text-[#67a68a] border-b-[#67a68a] border-b border-solid'
                : 'flex justify-center items-center text-sm text-[#999797] border-b-[#ebeaea] border-b border-solid'
            }
          >
            나의기록
          </Link>
          <Link
            href='/profile/myrecruit'
            className={
              router.pathname === '/profile/myrecruit'
                ? 'flex justify-center items-center text-sm text-[#67a68a] border-b-[#67a68a] border-b border-solid'
                : 'flex justify-center items-center text-sm text-[#999797] border-b-[#ebeaea] border-b border-solid'
            }
          >
            모임
          </Link>
        </nav>
        {children}
      </section>
    </div>
  );
}

export default ProfileLayout;
