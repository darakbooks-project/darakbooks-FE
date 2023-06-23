import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';

import { logout } from '@/api/auth';
import { getProfileApi } from '@/api/profile';
import { isAuthorizedSelector } from '@/recoil/auth';

function ProfileLayout({ children }: { children: ReactNode }) {
  const {
    query: { ownerId },
    push,
    pathname,
  } = useRouter();
  const mine = !ownerId;
  const { data: someoneData, status: someoneStatus } = useQuery(
    ['getUserProfile', 'profile', ownerId],
    () => getProfileApi(ownerId as string),
    { enabled: !!ownerId },
  );
  const { data: myData, status: myStatus } = useQuery(
    ['getUserProfile', 'profile', 'myprofile'],
    () => getProfileApi(),
    { enabled: !ownerId },
  );

  const data = mine ? myData : someoneData;
  const status = mine ? myStatus : someoneStatus;

  const setIsAuthorized = useSetRecoilState(isAuthorizedSelector);

  const onLogout = () => {
    logout();
    push('/');
    setIsAuthorized(false);
  };

  const routes = (pathname: string) => {
    return ownerId
      ? {
          pathname,
          query: { ownerId: ownerId },
        }
      : { pathname };
  };

  return (
    <div className='h-screen'>
      {status === 'success' && data && (
        <>
          <section className='w-full h-[30%] bg-[#fffef8] flex flex-col px-6 py-0'>
            <div className='flex items-center justify-end h-3/6'>
              {data.isMine && (
                <Image
                  src='images/profile/logout.svg'
                  alt='logout'
                  width={21}
                  height={19}
                  onClick={onLogout}
                />
              )}
            </div>
            <article className='h-3/6 flex items-center justify-between'>
              <div>
                <h1 className='text-2xl text-[#333333] font-[bold] mb-[5px]'>
                  {data.nickname}
                </h1>
                <p className='text-[13px] text-[#707070] flex gap-4'>
                  {data.userInfo ?? '좋아하는 것을 일고 기록해요 :)'}
                  {data.isMine && (
                    <Image
                      src='/images/profile/pencil.svg'
                      alt='edit'
                      width={14}
                      height={14}
                      onClick={() => push('/profile/edit')}
                    />
                  )}
                </p>
              </div>
              <Image
                src={data.photoUrl}
                alt={data.nickname}
                width='0'
                height='0'
                sizes='100vw'
                className='w-[4.5rem] h-[4.5rem]  rounded-[50%] '
              />
            </article>
          </section>
          <section className='h-[70%]'>
            <nav className='grid grid-cols-[repeat(3,1fr)] h-14 border-t-[#ebeaea] border-t border-solid'>
              <Link
                href={routes('/profile')}
                className={
                  pathname === '/profile'
                    ? 'flex justify-center items-center text-sm text-main border-b-main border-b border-solid'
                    : 'flex justify-center items-center text-sm text-[#999797] border-b-[#ebeaea] border-b border-solid'
                }
              >
                책장
              </Link>
              <Link
                href={routes('/profile/myfeed')}
                className={
                  pathname === '/profile/myfeed'
                    ? 'flex justify-center items-center text-sm text-main border-b-main border-b border-solid'
                    : 'flex justify-center items-center text-sm text-[#999797] border-b-[#ebeaea] border-b border-solid'
                }
              >
                나의기록
              </Link>
              <Link
                href={routes('/profile/myrecruit')}
                className={
                  pathname === '/profile/myrecruit'
                    ? 'flex justify-center items-center text-sm text-main border-b-main border-b border-solid'
                    : 'flex justify-center items-center text-sm text-[#999797] border-b-[#ebeaea] border-b border-solid'
                }
              >
                모임
              </Link>
            </nav>
            {children}
          </section>
        </>
      )}
    </div>
  );
}

export default ProfileLayout;
