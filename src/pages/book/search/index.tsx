import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';

import InfinityScrollLists from '@/components/book/search/InfinityScrollLists';
import BottomNav from '@/components/common/BottomNav';
import SearchInput from '@/components/common/SearchInput';
import {
  searchBookTitleAtom,
  searchInfinityScrollPositionAtom,
} from '@/recoil/book';

const BookSearchPage = () => {
  const [searchBookTitle, setSearchBookTitle] =
    useRecoilState(searchBookTitleAtom);
  const infinityScrollPosition = useRecoilValue(
    searchInfinityScrollPositionAtom,
  );

  const onSubmit = (keyword: string) => {
    setSearchBookTitle(keyword);
  };

  useEffect(() => {
    if (infinityScrollPosition !== 0) {
      window.scrollTo(0, infinityScrollPosition);
    }
  }, []);

  return (
    <Container>
      <SearchInput onSubmit={onSubmit} />
      <InfinityScrollLists searchKeyword={searchBookTitle} />
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
