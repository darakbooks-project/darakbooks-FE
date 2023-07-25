import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { fetchRecord } from '@/api/record';
import useRememberScroll from '@/hooks/useRememberScroll';

import FeedItem from './FeedItem';

const RecordFeedList = () => {
  const {
    data: mainFeedData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['feed', 'mainFeed'],
    ({ pageParam = Number.MAX_SAFE_INTEGER }) => fetchRecord(pageParam, 5),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.lastId) return;
        return lastPage.lastId;
      },
      staleTime: 1000 * 60 * 5,
    },
  );

  const [ref, inView] = useInView();
  const { currentScroll, resetScroll } = useRememberScroll('mainFeed');

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (currentScroll) {
      window.scrollTo(0, Number(currentScroll));
      resetScroll();
    }
  }, [currentScroll, resetScroll]);

  if (isError) return <></>;
  if (isLoading) return <></>;

  const mainFeedList = mainFeedData.pages.flatMap(
    (feedList) => feedList.records,
  );

  return (
    <ul className='mx-5'>
      {mainFeedList.length ? (
        mainFeedList.map((feed) => (
          <Fragment key={feed.recordId}>
            <FeedItem {...feed} />
          </Fragment>
        ))
      ) : (
        <div className='flex flex-col items-center justify-center text-center'>
          <h4 className='font-medium text-clampBase'>작성된 기록이 없어요.</h4>
          <p className=' text-clampSm text-[#707070] pt-1'>
            독서 기록을 작성하여 공유해보세요!
          </p>
        </div>
      )}
      <li ref={ref} className='h-4 '></li>
    </ul>
  );
};

export default RecordFeedList;
