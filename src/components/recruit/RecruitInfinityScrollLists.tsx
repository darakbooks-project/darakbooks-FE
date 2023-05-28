import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import tw from 'tailwind-styled-components';

import { getBookSearchResultData } from '@/api/book';

import SearchResultList from '../book/search/SearchResultList';

const RecruitInfinityScrollLists = () => {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(2);

  const {
    data: bookSearchResultLists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['reading', 'personnel', 'recruit'],
    ({ pageParam }) => getBookSearchResultData('미움 받을 용기', pageParam),
    {
      onSuccess: () => setPage((prev) => prev + 1),
      onError: (error) => console.error(error),
      getNextPageParam: (lastPage) => {
        if (lastPage.is_end) return;

        return page;
      },
    },
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <Container>
      {status === 'success' && (
        <>
          {bookSearchResultLists.pages.map(
            ({ documents }, index) =>
              documents.length > 0 &&
              documents[index] && (
                <SearchResultList
                  key={documents[index].isbn}
                  listData={documents}
                />
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
