import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { getProfileApi } from '@/api/profile';
import { getAllRecordsApi } from '@/api/record';
import BottomNav from '@/components/common/BottomNav';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/types/layout';

const MyFeed: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: someoneData } = useQuery(
    ['getUserProfile', 'profile', router.query.ownerId],
    () => getProfileApi(router.query.ownerId as string),
    { enabled: !!router.query.ownerId },
  );
  const { data: myData } = useQuery(
    ['getUserProfile', 'profile', 'myprofile'],
    () => getProfileApi(),
    { enabled: !router.query.ownerId },
  );

  const [ref, inView] = useInView();
  const {
    fetchNextPage: myRecordsFetchNextPage,
    hasNextPage: myRecordsHasNextPage,
    data: getAllMyRecords,
    status: myRecordsStatus,
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
      enabled: !router.query.ownerId,
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
      getAllRecordsApi(pageParam, 9, router.query.ownerId as string),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.lastId) {
          return;
        }
        return lastPage.lastId;
      },
      enabled: !!router.query.ownerId,
    },
  );

  const recordsData = getAllMyRecords ? getAllMyRecords : getAllSomeoneRecords;
  const userData = someoneData ? someoneData : myData;
  const allRecords = recordsData?.pages.flatMap((page) => page.records);

  const recordsStatus =
    someoneRecordsStatus === 'success' ? someoneRecordsStatus : myRecordsStatus;

  const hasNextPage = getAllMyRecords
    ? myRecordsHasNextPage
    : someoneRecordsHasNextPage;

  const fetchNextPage = getAllMyRecords
    ? myRecordsFetchNextPage
    : someoneRecordsFetchNextPage;

  useEffect(() => {
    if (!getAllMyRecords) return;
    if (hasNextPage && inView) fetchNextPage();
  }, [fetchNextPage, getAllMyRecords, hasNextPage, inView]);

  return (
    <>
      {recordsStatus === 'success' && (
        <>
          {userData?.isMine === false && userData.bookshelfIsHidden === true ? (
            <div>비공개</div>
          ) : (
            <>
              <div className='flex items-center justify-between px-6 py-0 h-14'>
                <span>독서기록</span>
                {userData?.isMine ? (
                  <span className='text-[15px] text-[#333333]'>편집</span>
                ) : null}
              </div>
              <section className='grid grid-cols-[repeat(3,1fr)] gap-0.5'>
                <>
                  {allRecords?.map((item) => (
                    <Image
                      src={item.recordImgUrl}
                      alt={item.book.title}
                      width='0'
                      height='0'
                      sizes='100vw'
                      className='h-32 w-full'
                      key={item.recordId}
                    />
                  ))}
                </>
              </section>
              <div ref={ref}></div>
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
