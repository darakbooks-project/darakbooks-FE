import React from 'react';
import tw from 'tailwind-styled-components';

import BottomNav from '@/components/common/BottomNav';
import SearchResult from '@/components/common/ListItem/SearchResult';
import SearchInput from '@/components/common/SearchInput';

const BookSearchPage = () => {
  return (
    <Container>
      <SearchInput />
      <SearchResult
        src='https://image.yes24.com/goods/15058512/XL'
        imageSize='not-feed-small'
        title='미움 받을 용기'
        author='기시미 이치로'
        publisher='이치로 출판사'
      />
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
