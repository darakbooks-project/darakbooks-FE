import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { fetchRecord } from '@/api/main';
import { RecordType } from '@/types/record';

import FeedItem from './FeedItem';

const RecordFeedList = () => {
  const {
    data: mainFeedData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<RecordType[]>(
    ['mainFeed'],
    ({ pageParam = '' }) => fetchRecord(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.length) return;
        return lastPage[lastPage.length - 1].recordId;
      },
    },
  );

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) return <></>;
  if (isLoading) return <></>;

  const mainFeedList = mainFeedData.pages.flatMap((feedList) => feedList);

  return (
    <div className='mx-5'>
      {mainFeedList.map((feed) => (
        <Fragment key={feed.recordId}>
          <FeedItem {...feed} />
        </Fragment>
      ))}
      <div ref={ref} className=' h-4'></div>
    </div>
  );
};

export default RecordFeedList;
