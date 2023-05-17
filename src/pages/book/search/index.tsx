import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

import { getBookSearchResultData } from '@/api/book';
import SearchResultList from '@/components/book/search/SearchResultList';
import BottomNav from '@/components/common/BottomNav';
import SearchInput from '@/components/common/SearchInput';

const BookSearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data: bookSearchResultList, isLoading } = useQuery(
    ['book', 'search', 'result', 'list', searchKeyword],
    () => getBookSearchResultData(searchKeyword),
    {
      enabled: !!searchKeyword,
    },
  );

  const onSubmit = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <Container>
      <SearchInput onSubmit={onSubmit} />
      {!isLoading && <SearchResultList listData={bookSearchResultList} />}
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
