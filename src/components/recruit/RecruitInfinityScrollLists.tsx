import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import tw from 'tailwind-styled-components';

import { getReadingClassData } from '@/api/recruit';

import RecruitList from './RecruitList';

const RecruitInfinityScrollLists = () => {
  const { ref, inView } = useInView();

  const {
    data: readingGroupLists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['reading', 'group', 'list'],
    ({ pageParam = 2 }) => getReadingClassData(pageParam),
    {
      onError: (error) => console.error(error),
      getNextPageParam: (lastPage) => {
        if (parseInt(lastPage.currentPage) === lastPage.totalPages) return;

        return parseInt(lastPage.currentPage) + 1;
      },
      staleTime: 20000,
    },
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <Container>
      {status === 'success' && (
        <>
          {readingGroupLists.pages.map(
            ({ groups, currentPage }, index) =>
              groups.length > 0 &&
              groups[index] && (
                <RecruitList key={currentPage} listData={groups} />
              ),
          )}

          <Bottom ref={ref}>
            {isFetchingNextPage && hasNextPage && 'Loading...'}
          </Bottom>
        </>
      )}
    </Container>
  );
};

export default RecruitInfinityScrollLists;

const Container = tw.div``;

const Bottom = tw.div``;
