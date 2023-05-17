import React from 'react';
import tw from 'tailwind-styled-components';

import SearchResultList from '@/components/book/search/SearchResultList';
import BottomNav from '@/components/common/BottomNav';
import SearchInput from '@/components/common/SearchInput';

const BookSearchPage = () => {
  return (
    <Container>
      <SearchInput />
      <SearchResultList />
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
