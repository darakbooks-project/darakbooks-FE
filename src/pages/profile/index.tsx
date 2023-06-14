import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { getMyProfileApi, getUserProfileApi } from '@/api/profile';
import BottomNav from '@/components/common/BottomNav';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/types/layout';

const ProfilePage: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <div className='flex items-center justify-between px-6 py-0 h-14'>
        <span className='text-[15px] text-[#707070]'>
          전체 <span className='text-[15px] text-[#67a68a]'>6</span>권
        </span>
        <span className='text-[15px] text-[#333333]'>편집</span>
      </div>
      <section className='grid grid-cols-[repeat(3,1fr)] px-4 py-0'>
        <article className='relative flex flex-col items-center mb-4'>
          <div className='absolute flex items-center justify-center w-4 h-4 text-[4px] bg-[#707070] rounded-[50%] right-0.5'>
            X
          </div>
          <section className='w-full shadow-[0px_4px_8px_rgba(0,0,0,0.15)] mb-4 p-[7px]'>
            <div className='w-full h-[9.5rem] border rounded-[0px_3px_3px_0px] border-solid border-[blue] shadow-[0px_0px_7px_rgba(0, 0, 0, 0.25)]'>
              <Image src='' alt='' />
            </div>
          </section>
          <div className='flex flex-col items-center w-full'>
            <h3 className='text-[13px] text-[#333333] mb-[5px]'>긴긴밤</h3>
            <h4 className='text-[11px] text-[#707070]'>루리</h4>
          </div>
        </article>
      </section>
      <BottomNav />
    </>
  );
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient();

  if (context.query.isbn) {
    await queryClient.prefetchQuery(['getUserProfile', 'profile'], () => {
      getUserProfileApi(context.query.isbn as string);
    });
  } else {
    await queryClient.prefetchQuery(['getMyProfile', 'profile'], () => {
      getMyProfileApi();
    });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProfilePage;
