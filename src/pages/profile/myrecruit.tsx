import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { getProfileApi } from '@/api/profile';
import { getGroupsApi } from '@/api/recruit';
import BottomNav from '@/components/common/BottomNav';
import Seo from '@/components/common/Seo';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/types/layout';

const MyRecruit: NextPageWithLayout = () => {
  const {
    query: { ownerId },
    push,
  } = useRouter();

  const { data: someoneRecruit, status: someoneStatus } = useQuery(
    ['getGroups', 'someoneRecruit'],
    () => getGroupsApi(ownerId as string),
    {
      enabled: !!ownerId,
    },
  );

  const { data: myRecruit, status: myStatus } = useQuery(
    ['getGroups', 'myRecruit'],
    () => getGroupsApi(),
    {
      enabled: !ownerId,
    },
  );

  const { data: someoneData } = useQuery(
    ['getUserProfile', 'profile', ownerId],
    () => getProfileApi(ownerId as string),
    { enabled: !!ownerId },
  );
  const { data: myData } = useQuery(
    ['getUserProfile', 'profile', 'myprofile'],
    () => getProfileApi(),
    { enabled: !ownerId },
  );

  const recruitData = ownerId ? someoneRecruit : myRecruit;
  const recruitStatus = ownerId ? someoneStatus : myStatus;
  const userData = ownerId ? someoneData : myData;

  const leadingGroup = recruitData?.filter(
    (data) => data.is_group_lead && data.is_participant,
  );
  const participantGroup = recruitData?.filter(
    (data) => !data.is_group_lead && data.is_participant,
  );

  const onRecruitClick = (groupId: string) => {
    push({
      pathname: '/recruit/detail',
      query: {
        groupId,
      },
    });
  };

  return (
    <>
      <Seo
        title={`다락책방 | ${userData?.nickname}`}
        description={`${userData?.nickname}님의 독서모임입니다`}
        image={userData?.photoUrl}
      />
      {recruitStatus === 'success' && recruitData && (
        <main className='flex flex-col gap-12 px-6 py-5  h-[calc(100%_-_8.5rem)]'>
          {!userData?.isMine && userData?.bookshelfIsHidden ? (
            <div className='h-full flex flex-col justify-center items-center '>
              <h5 className='text-base font-medium text-[#333333]'>
                비공개 계정입니다.
              </h5>
              <p className='text-[13px] text-[#707070]'>
                이 계정은 확인할 수 없습니다.
              </p>
            </div>
          ) : (
            <>
              <section className='flex flex-col justify-center h-3/6'>
                <h3 className='font-medium text-[17px] text-[#333333] mb-2'>
                  운영중인 모임
                </h3>
                <div className='w-full h-36 flex flex-col overflow-scroll gap-3.5'>
                  {leadingGroup && leadingGroup.length > 0 ? (
                    leadingGroup.map((item) => (
                      <article
                        className='w-full h-full bg-white border flex flex-col gap-2 p-6 rounded-[10px] border-solid border-[#dfdfdf]'
                        key={item.group_id}
                        onClick={() => onRecruitClick(item.group_id + '')}
                      >
                        <h4 className='text-[15px] text-[#333333] font-[bold]'>
                          {item.name}
                        </h4>
                        <div>
                          <p className='text-[13px] text-[#707070]'>
                            {item.meeting_type === 'offline'
                              ? '오프라인'
                              : '온라인'}{' '}
                            - 매주 {item.day} {item.time}
                          </p>
                        </div>
                        <div className='flex justify-between items-center'>
                          <div className='h-full flex items-center'>
                            {item.userGroup
                              .slice(0, 3)
                              .map(({ photoId, photoUrl, nickname }) => (
                                <Image
                                  key={photoId}
                                  src={photoUrl}
                                  alt={nickname}
                                  width='0'
                                  height='0'
                                  className='w-6 h-6 bg-[#d9d9d9] border rounded-[50%] border-solid border-white'
                                />
                              ))}
                            {item.userGroup.length > 3 && (
                              <span className='ml-1 text-[11px] text-[#707070]'>
                                외
                                {
                                  item.userGroup.slice(3, item.userGroup.length)
                                    .length
                                }
                                명
                              </span>
                            )}
                          </div>
                          <span
                            className={
                              item.recruitment_status
                                ? 'flex justify-center items-center w-[2.8rem] h-5 bg-main text-[11px] text-white rounded-[3px]'
                                : 'flex justify-center items-center w-[2.8rem] h-5 bg-[#C2C1C1] text-[11px] text-white rounded-[3px]'
                            }
                          >
                            {item.recruitment_status ? '모집중' : '모집완료'}
                          </span>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div
                      className='h-full flex flex-col justify-center items-center gap-2 rounded-[10px] bg-[#f3f3f3]'
                      onClick={() => {
                        push('/recruit/write');
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
                  {participantGroup && participantGroup.length > 0 ? (
                    participantGroup.map((item) => (
                      <article
                        className='w-full bg-white border flex flex-col gap-2 p-6 rounded-[10px] border-solid border-[#dfdfdf]'
                        key={item.group_id}
                        onClick={() => onRecruitClick(item.group_id + '')}
                      >
                        <h4 className='text-[15px] text-[#333333] font-[bold]'>
                          {item.name}
                        </h4>
                        <div>
                          <p className='text-[13px] text-[#707070]'>
                            {item.meeting_type === 'offline'
                              ? '오프라인'
                              : '온라인'}{' '}
                            - 매주 {item.day} {item.time}
                          </p>
                        </div>
                        <div className='flex justify-between items-center'>
                          <div className='h-full flex'>
                            {item.userGroup
                              .slice(0, 3)
                              .map(({ photoId, photoUrl, nickname }) => (
                                <Image
                                  key={photoId}
                                  src={photoUrl}
                                  alt={nickname}
                                  width='0'
                                  height='0'
                                  className='w-6 h-6 bg-[#d9d9d9] border rounded-[50%] border-solid border-white'
                                />
                              ))}
                            {item.userGroup.length > 3 && (
                              <span className='flex items-center ml-1 text-[11px] text-[#707070]'>
                                외
                                {
                                  item.userGroup.slice(3, item.userGroup.length)
                                    .length
                                }
                                명
                              </span>
                            )}
                          </div>
                          <span
                            className={
                              item.recruitment_status
                                ? 'flex justify-center items-center w-[2.8rem] h-5 bg-main text-[11px] text-white rounded-[3px]'
                                : 'flex justify-center items-center w-[2.8rem] h-5 bg-[#C2C1C1] text-[11px] text-white rounded-[3px]'
                            }
                          >
                            {item.recruitment_status ? '모집중' : '모집완료'}
                          </span>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className='h-full flex flex-col justify-center items-center gap-2 rounded-[10px] bg-[#f3f3f3]'>
                      <span className='font-normal text-[15px] text-[#999797]'>
                        참여중인 모임이 없어요
                      </span>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}

          <BottomNav />
        </main>
      )}
    </>
  );
};

MyRecruit.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient();

  if (context.query.ownerId) {
    Promise.all([
      await queryClient.prefetchQuery(['getGroups', 'someoneRecruit'], () =>
        getGroupsApi(context.query.ownerId as string),
      ),
      await queryClient.prefetchQuery(
        ['getUserProfile', 'profile', context.query.ownerId],
        () => getProfileApi(context.query.ownerId as string),
      ),
    ]);
  } else {
    Promise.all([
      await queryClient.prefetchQuery(['getGroups', 'myRecruit'], () =>
        getGroupsApi(),
      ),
      await queryClient.prefetchQuery(
        ['getUserProfile', 'profile', 'myprofile'],
        () => getProfileApi(),
      ),
    ]);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MyRecruit;
