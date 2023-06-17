import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { getAllMyGroupsApi } from '@/api/recruit';
import BottomNav from '@/components/common/BottomNav';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/types/layout';

const MyRecruit: NextPageWithLayout = () => {
  const router = useRouter();

  // const { data, status } = useQuery(['getAllMyGroups', 'myrecruit'], () =>
  //   getAllMyGroupsApi(),
  // );

  // const leadingGroup = data?.filter(
  //   (group) => group.group.is_group_lead === true,
  // );
  // const participantGroup = data?.filter((group) => !group.group.is_group_lead);

  // console.log(data);
  // console.log('dd', leadingGroup);

  return (
    <>
      {/* {status === 'success' && (
        <main className='flex flex-col gap-12 px-6 py-10'>
          <section className='flex flex-col justify-center h-3/6'>
            <h3 className='font-medium text-[17px] text-[#333333] mb-2'>
              운영중인 모임
            </h3>
            <div className='w-full h-36 flex flex-col overflow-scroll gap-3.5'>
              {leadingGroup && leadingGroup.length !== 0 ? (
                leadingGroup.map((item) => (
                  <article
                    className='w-full h-full bg-white border flex flex-col gap-2 p-6 rounded-[10px] border-solid border-[#dfdfdf]'
                    key={item.group_id}
                  >
                    <h4 className='text-[15px] text-[#333333] font-[bold]'>
                      {item.name}
                    </h4>
                    <div>
                      <p className='text-[13px] text-[#707070]'>
                        {item.meeting_type} - 매주 {item.day} {item.time}
                      </p>
                    </div>
                    <div className='flex justify-between items-center'>
                      <div className='h-full flex'>
                        {item.userGroup.map((user) => (
                          <Image
                            key={user.photoId}
                            src={user.photoId}
                            alt={user.nickname}
                            width='0'
                            height='0'
                            className='w-6 h-6 bg-[#d9d9d9] border rounded-[50%] border-solid border-white'
                          />
                        ))}
                      </div>
                      <span className='flex justify-center items-center w-[2.8rem] h-5 bg-main text-[11px] text-white rounded-[3px]'>
                        {item.recruitment_status ? '모집중' : '모집완료'}
                      </span>
                    </div>
                  </article>
                ))
              ) : (
                <div
                  className='h-full flex flex-col justify-center items-center gap-2 rounded-[10px] bg-[#f3f3f3]'
                  onClick={() => {
                    router.push('/recruit/write');
                  }}
                >
                  <span className='font-medium text-xs text-[#999797]'>
                    아직 운영중인 모임이 없어요!
                  </span>
                  <span className='font-bold text-2xl text-[#999797]'>
                    모임 만들기 +
                  </span>
                </div>
              )}
            </div>
          </section>
          <section className='flex flex-col justify-center h-3/6 pb-10'>
            <h3 className='font-medium text-[17px] text-[#333333] mb-2'>
              참여중인 모임
            </h3>
            <div className='w-full h-36 flex flex-col overflow-scroll gap-3.5'>
              {participantGroup && participantGroup.length === 0 ? (
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
                    <span className='flex justify-center items-center w-[2.8rem] h-5 bg-main text-[11px] text-white rounded-[3px]'>
                      모집중
                    </span>
                  </div>
                </article>
              ) : (
                <div className='h-full flex flex-col justify-center items-center gap-2 rounded-[10px] bg-[#f3f3f3]'>
                  <span className='font-normal text-[15px] text-[#999797]'>
                    참여중인 모임이 없어요
                  </span>
                </div>
              )}
            </div>
          </section>
          <BottomNav />
        </main>
      )} */}
    </>
  );
};

MyRecruit.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getAllMyGroups', 'myrecruit'], () =>
    getAllMyGroupsApi(),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MyRecruit;
