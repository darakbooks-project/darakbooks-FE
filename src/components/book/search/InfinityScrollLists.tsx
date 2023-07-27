import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';

import { getBookSearchResultData } from '@/api/book';
import { searchInfinityScrollPageAtom } from '@/recoil/book';

import SearchResultList from './SearchResultList';

interface InfinityScrollListsProps {
  searchKeyword: string;
}

const InfinityScrollLists = ({ searchKeyword }: InfinityScrollListsProps) => {
  const { ref, inView } = useInView();
  const [page, setPage] = useRecoilState(searchInfinityScrollPageAtom);
  const queryClient = useQueryClient();
  const isBookSearchData = !!queryClient.getQueryData([
    'book',
    'search',
    'result',
    'list',
    searchKeyword,
  ]);

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
      enabled: !!searchKeyword && !isBookSearchData,
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
    if (isBookSearchData) return;

    searchKeyword && setPage(1);
  }, [searchKeyword, setPage, isBookSearchData]);

  return (
    <Container>
      {status === 'success' && (
        <>
          {bookSearchResultLists.pages.map(({ documents }, index) =>
            documents.length > 0 ? (
              <SearchResultList key={index} listData={documents} />
            ) : (
              <NoSearchResult key='not-search-result'>
                검색 결과가 없습니다.
              </NoSearchResult>
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

const NoSearchResult = tw.div`
  fixed
  top-[50%]
  translate-y-[-50%]
  left-[50%]
  translate-x-[-50%]
  text-textGray
  text-[0.9375rem]
`;
