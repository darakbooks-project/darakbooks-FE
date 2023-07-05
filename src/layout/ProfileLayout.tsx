import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { logout } from '@/api/auth';
import { getProfileApi } from '@/api/profile';
import { isAuthorizedSelector } from '@/recoil/auth';
import { isRendedOnboardingAtom } from '@/recoil/onboarding';

function ProfileLayout({ children }: { children: ReactNode }) {
  const {
    query: { ownerId },
    push,
    pathname,
  } = useRouter();
  const setIsRendedOnboarding = useSetRecoilState(isRendedOnboardingAtom);
  const mine = !ownerId;
  const { data: someoneData, status: someoneStatus } = useQuery(
    ['getUserProfile', 'profile', ownerId],
    () => getProfileApi(ownerId as string),
    { enabled: !!ownerId },
  );
  const { data: myData, status: myStatus } = useQuery(
    ['getMyProfile', 'profile', 'myprofile'],
    () => getProfileApi(),
    { enabled: !ownerId },
  );

  const data = mine ? myData : someoneData;
  const status = mine ? myStatus : someoneStatus;

  const setIsAuthorized = useSetRecoilState(isAuthorizedSelector);

  const onLogout = () => {
    logout();
    setIsAuthorized(false);
    setIsRendedOnboarding(true);
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
          <section className='w-full h-[30%] bg-[#ffffff] flex flex-col px-6 py-0'>
            <div className='flex items-center justify-end h-3/6'>
              {data.isMine && (
                <Image
                  src='/images/profile/layout/logout.svg'
                  alt='logout'
                  width={32}
                  height={32}
                  onClick={onLogout}
                />
              )}
            </div>
            <article className='h-3/6 flex items-center gap-4'>
              <Image
                src={data.photoUrl}
                alt={data.nickname}
                width='0'
                height='0'
                sizes='100vw'
                className='w-[4.5rem] h-[4.5rem]  rounded-[50%] '
              />
              <div>
                <h1 className='text-2xl text-[#333333] font-[bold] mb-[5px]'>
                  {data.nickname}
                </h1>
                <p className='text-[13px] text-[#707070] flex gap-4'>
                  {data.userInfo ?? '좋아하는 것을 일고 기록해요 :)'}
                </p>
              </div>
            </article>
            {data.isMine && (
              <button
                className='flex justify-center items-center h-11 border rounded text-[13px] text-[#333333] border-solid border-[#dfdfdf]'
                onClick={() => push('/profile/edit')}
              >
                <Image
                  src='/images/profile/layout/edit.svg'
                  alt='edit'
                  width={24}
                  height={24}
                />
                프로필 편집
              </button>
            )}
          </section>
          <section className='h-[70%] bg-[#ffffff]'>
            <nav className='grid grid-cols-[repeat(3,1fr)] h-14 '>
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
