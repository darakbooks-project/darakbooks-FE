import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import tw from 'tailwind-styled-components';

import { getBookSearchResultData } from '@/api/book';
import SearchResultList from '@/components/book/search/SearchResultList';
import BottomNav from '@/components/common/BottomNav';
import SearchInput from '@/components/common/SearchInput';

const BookSearchPage = () => {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');

  const onSubmit = (keyword: string) => {
    setSearchKeyword(keyword);
    setPage(1);
  };

  const {
    data: bookSearchResultLists,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['book', 'search', 'result', 'list', searchKeyword],
    ({ pageParam = page }) => getBookSearchResultData(searchKeyword, pageParam),
    {
      onSuccess: () => setPage((prev) => prev + 1),
      getNextPageParam: (lastPage) => {
        if (lastPage.is_end) return;

        return page;
      },
      enabled: !!searchKeyword,
    },
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <Container>
      <SearchInput onSubmit={onSubmit} />
      {status === 'success' &&
        bookSearchResultLists.pages.map(({ documents }, index) =>
          documents.length > 0 && documents[index] ? (
            <SearchResultList
              key={documents[index].isbn}
              listData={documents}
            />
          ) : (
            <div key='not search result'>검색 결과가 없습니다.</div>
          ),
        )}

      <div ref={ref}>{isFetchingNextPage && hasNextPage && 'Loading...'}</div>
      {!isFetchingNextPage}
      <BottomNav />
    </Container>
  );
};

export default BookSearchPage;

const Container = tw.div`
  w-[90%]
  mx-auto
  mt-8
`;
