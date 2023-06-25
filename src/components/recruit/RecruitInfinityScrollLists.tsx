import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';

import { getReadingClassData } from '@/api/recruit';
import { readingGroupInfinityScrollPositionAtom } from '@/recoil/recruit';

import RecruitList from './RecruitList';

interface RecruitInfinityScrollListsProps {
  islistchange?: string;
}

const RecruitInfinityScrollLists = ({
  islistchange,
}: RecruitInfinityScrollListsProps) => {
  const { ref, inView } = useInView();
  const infinityScrollPosition = useRecoilValue(
    readingGroupInfinityScrollPositionAtom,
  );

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
    ({ pageParam = 1 }) => getReadingClassData(pageParam),
    {
      onError: (error) => console.error(error),
      getNextPageParam: (lastPage) => {
        if (parseInt(lastPage.currentPage) === lastPage.totalPages) return;

        return parseInt(lastPage.currentPage) + 1;
      },
      enabled: !readingGroupQueryData.current || !!islistchange,
    },
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  useEffect(() => {
    if (infinityScrollPosition === 0 || (islistchange && isRefetching)) return;

    window.scrollTo(0, infinityScrollPosition);
  }, [isRefetching]);

  if (isRefetching) {
    return (
      <div>
        {islistchange === 'update'
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
