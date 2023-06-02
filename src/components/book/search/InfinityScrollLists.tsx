import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import tw from 'tailwind-styled-components';

import { getBookSearchResultData } from '@/api/book';

import SearchResultList from './SearchResultList';

interface InfinityScrollListsProps {
  searchKeyword: string;
}

const InfinityScrollLists = ({ searchKeyword }: InfinityScrollListsProps) => {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);

  const {
    data: bookSearchResultLists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['book', 'search', 'result', 'list', searchKeyword],
    ({ pageParam = 1 }) => getBookSearchResultData(searchKeyword, pageParam),
    {
      onSuccess: () => setPage((prev) => prev + 1),
      onError: (error) => console.error(error),
      getNextPageParam: (lastPage) => {
        if (lastPage.is_end) return;

        return page;
      },
      enabled: !!searchKeyword,
    },
  );

  useEffect(() => {
    if (inView && bookSearchResultLists) {
      const { pages } = bookSearchResultLists;
      const { is_end } = pages[pages.length - 1];

      !is_end && fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    if (searchKeyword) setPage(1);
  }, [searchKeyword]);

  return (
    <Container>
      {status === 'success' && (
        <>
          {bookSearchResultLists.pages.map(({ documents }, index) =>
            documents.length > 0 && documents[index] ? (
              <SearchResultList
                key={documents[index].isbn}
                listData={documents}
              />
            ) : (
              <div key='not-search-result'>검색 결과가 없습니다.</div>
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

export default InfinityScrollLists;

const Container = tw.div``;

const Bottom = tw.div``;
