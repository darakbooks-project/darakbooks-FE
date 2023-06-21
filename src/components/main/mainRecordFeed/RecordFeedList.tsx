import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { fetchRecord } from '@/api/record';

import FeedItem from './FeedItem';

const RecordFeedList = () => {
  const {
    data: mainFeedData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['mainFeed'],
    ({ pageParam = Number.MAX_SAFE_INTEGER }) => fetchRecord(pageParam, 5),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.lastId) return;
        return lastPage.lastId;
      },
    },
  );

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) return <></>;
  if (isLoading) return <></>;

  const mainFeedList = mainFeedData.pages.flatMap(
    (feedList) => feedList.records,
  );

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
