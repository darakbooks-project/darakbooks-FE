import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import tw from 'tailwind-styled-components';

import { getReadingGroupData } from '@/api/recruit';
import useRememberScroll from '@/hooks/useRememberScroll';

import RecruitList from './RecruitList';

interface RecruitInfinityScrollListsProps {
  listchangetype?: string;
}

const RecruitInfinityScrollLists = ({
  listchangetype,
}: RecruitInfinityScrollListsProps) => {
  const { ref, inView } = useInView();
  const { currentScroll, resetScroll } = useRememberScroll('groupList');

  const queryClient = useQueryClient();
  const readingGroupQueryData = useRef(
    queryClient.getQueryData(['reading', 'group', 'list']),
  );

  const {
    data: readingGroupLists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isRefetching,
  } = useInfiniteQuery(
    ['reading', 'group', 'list'],
    ({ pageParam = 1 }) => getReadingGroupData(pageParam),
    {
      onError: (error) => console.error(error),
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage === lastPage.totalPages) return;

        return lastPage.currentPage + 1;
      },
      enabled: !readingGroupQueryData.current || !!listchangetype,
    },
  );

  useEffect(() => {
    if (!inView) return;

    hasNextPage && fetchNextPage();
  }, [fetchNextPage, inView, hasNextPage]);

  useEffect(() => {
    if (currentScroll === 0 || (listchangetype && isRefetching)) return;

    window.scrollTo(0, Number(currentScroll));
    resetScroll();
  }, [isRefetching]);

  if (isRefetching) {
    return (
      <div>
        {listchangetype === 'update'
          ? '수정하신 내용을 기반으로 업데이트하고 있어요!'
          : '새로운 모임이 추가되고 있어요!'}
      </div>
    );
  }

  return (
    <Container>
      {status === 'success' && (
        <>
          {readingGroupLists.pages.map(
            ({ groups, currentPage }) =>
              groups.length > 0 && (
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

const Container = tw.section``;

const Bottom = tw.div``;
