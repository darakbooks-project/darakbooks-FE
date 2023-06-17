import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { ReactElement, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { getAllMyRecordsApi } from '@/api/record';
import BottomNav from '@/components/common/BottomNav';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/types/layout';

const MyFeed: NextPageWithLayout = () => {
  const [ref, inView] = useInView();
  const {
    fetchNextPage,
    hasNextPage,
    data: getAllMyRecords,
    status,
  } = useInfiniteQuery(
    ['getAllMyRecords', 'myfeed'],
    ({ pageParam = Number.MAX_SAFE_INTEGER }) =>
      getAllMyRecordsApi(pageParam, 9),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.lastId) {
          return;
        }
        return lastPage.lastId;
      },
    },
  );

  const bookRelatedAllRecord = getAllMyRecords?.pages.flatMap(
    (page) => page.records,
  );

  useEffect(() => {
    if (!getAllMyRecords) return;
    if (hasNextPage && inView) fetchNextPage();
  }, [fetchNextPage, getAllMyRecords, hasNextPage, inView]);

  return (
    <>
      <div className='flex items-center justify-between px-6 py-0 h-14'>
        <span></span>
        <span className='text-[15px] text-[#333333]'>편집</span>
      </div>
      <section className='grid grid-cols-[repeat(3,1fr)] gap-0.5'>
        {status === 'success' && (
          <>
            {bookRelatedAllRecord?.map((item) => (
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
        )}
      </section>
      <div ref={ref}></div>
      <BottomNav />
    </>
  );
};

MyFeed.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default MyFeed;
