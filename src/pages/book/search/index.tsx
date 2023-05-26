import { useState } from 'react';
import tw from 'tailwind-styled-components';

import InfinityScrollLists from '@/components/book/search/InfinityScrollLists';
import BottomNav from '@/components/common/BottomNav';
import SearchInput from '@/components/common/SearchInput';

const BookSearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const onSubmit = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <Container>
      <SearchInput onSubmit={onSubmit} />
      <InfinityScrollLists searchKeyword={searchKeyword} />
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
