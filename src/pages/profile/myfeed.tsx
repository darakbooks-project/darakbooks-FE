import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { getProfileApi } from '@/api/profile';
import { deleteRecordApi, getAllRecordsApi } from '@/api/record';
import BottomNav from '@/components/common/BottomNav';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/types/layout';

const MyFeed: NextPageWithLayout = () => {
  const {
    query: { ownerId },
    push,
  } = useRouter();
  const [edit, setEdit] = useState(false);
  const deleteRecord = useMutation(deleteRecordApi);
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

  const [ref, inView] = useInView();
  const {
    fetchNextPage: myRecordsFetchNextPage,
    hasNextPage: myRecordsHasNextPage,
    data: getAllMyRecords,
    status: myRecordsStatus,
    refetch,
  } = useInfiniteQuery(
    ['getAllMyRecords', 'myfeed'],
    ({ pageParam = Number.MAX_SAFE_INTEGER }) => getAllRecordsApi(pageParam, 9),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.lastId) {
          return;
        }
        return lastPage.lastId;
      },
      enabled: !ownerId,
    },
  );
  const {
    fetchNextPage: someoneRecordsFetchNextPage,
    hasNextPage: someoneRecordsHasNextPage,
    data: getAllSomeoneRecords,
    status: someoneRecordsStatus,
  } = useInfiniteQuery(
    ['getAllSomeoneRecords', 'someonefeed'],
    ({ pageParam = Number.MAX_SAFE_INTEGER }) =>
      getAllRecordsApi(pageParam, 9, ownerId as string),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.lastId) {
          return;
        }
        return lastPage.lastId;
      },
      enabled: !!ownerId,
    },
  );

  const recordsData = ownerId ? getAllSomeoneRecords : getAllMyRecords;
  const userData = ownerId ? someoneData : myData;
  const recordsStatus = ownerId ? someoneRecordsStatus : myRecordsStatus;
  const hasNextPage = ownerId
    ? someoneRecordsHasNextPage
    : myRecordsHasNextPage;
  const allRecords = recordsData?.pages.flatMap((page) => page.records);

  const fetchNextPage = ownerId
    ? someoneRecordsFetchNextPage
    : myRecordsFetchNextPage;

  useEffect(() => {
    if (hasNextPage && inView) fetchNextPage();
  }, [fetchNextPage, getAllMyRecords, hasNextPage, inView]);

  const removeRecord = (id: string) => {
    deleteRecord.mutate(id, {
      onSuccess: () => {
        alert('독서기록을 삭제하였습니다.');
        refetch();
      },
    });
  };

  return (
    <>
      {recordsStatus === 'success' && allRecords && (
        <>
          {!userData?.isMine && userData?.bookshelfIsHidden ? (
            <div className='h-[calc(100%_-_8.5rem)] flex flex-col justify-center items-center leading-[1.3rem]'>
              <h5 className='text-base font-medium text-[#333333]'>
                비공개 계정입니다.
              </h5>
              <p className='text-[13px] text-[#707070]'>
                이 계정은 확인할 수 없습니다.
              </p>
            </div>
          ) : (
            <>
              {allRecords.length < 1 ? (
                <div className='h-[calc(100%_-_8.5rem)] flex flex-col justify-center items-center'>
                  <h5 className='text-base font-medium text-[#333333]'>
                    기록이 없어요.
                  </h5>
                </div>
              ) : (
                <>
                  <div className='flex items-center justify-between px-6 py-0 h-14'>
                    <span className='text-[15px] text-[#707070]'>
                      전체{' '}
                      <span className='text-[15px] text-[#67a68a]'>
                        {allRecords.length}
                      </span>
                      개
                    </span>
                    {userData?.isMine ? (
                      <span
                        className='text-[15px] text-[#333333]'
                        onClick={() => setEdit((prev) => !prev)}
                      >
                        {edit ? '완료' : '편집'}
                      </span>
                    ) : null}
                  </div>
                  <section className='grid grid-cols-[repeat(3,1fr)] gap-0.5'>
                    <>
                      {allRecords.map((item) => (
                        <div key={item.recordId} className='relative'>
                          {edit && (
                            <Image
                              src='/images/record/delete.svg'
                              alt='delete'
                              width={34}
                              height={34}
                              className='absolute -right-1 -bottom-1'
                              onClick={() => removeRecord(item.recordId + '')}
                            />
                          )}
                          <Image
                            src={item.recordImgUrl}
                            alt={item.book.title}
                            width='0'
                            height='0'
                            sizes='100vw'
                            className='h-32 w-full'
                            onClick={() =>
                              push({
                                pathname: '/book/feed',
                                query: {
                                  recordId: item.recordId,
                                  type: 'RECORDS',
                                  ownerId,
                                },
                              })
                            }
                          />
                        </div>
                      ))}
                    </>
                  </section>
                  <div ref={ref}></div>
                </>
              )}
            </>
          )}
        </>
      )}
      <BottomNav />
    </>
  );
};

MyFeed.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient();

  if (context.query.ownerId) {
    await queryClient.prefetchQuery(
      ['getUserProfile', 'profile', context.query.ownerId],
      () => getProfileApi(context.query.ownerId as string),
    );
  } else {
    await queryClient.prefetchQuery(
      ['getUserProfile', 'profile', 'myprofile'],
      () => getProfileApi(),
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MyFeed;
