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
    <>
      <Container>
        <BackGroundWrap>
          <BackGround>
            <Title>
              어떤 책을 <br />
              찾고 계신가요?
            </Title>
            <SearchInputWrap>
              <SearchInput onSubmit={onSubmit} inputText={searchBookTitle} />
            </SearchInputWrap>
          </BackGround>
        </BackGroundWrap>
        <BookSearchListsWrap>
          <BookSearchLists>
            <InfinityScrollLists searchKeyword={searchBookTitle} />
          </BookSearchLists>
        </BookSearchListsWrap>
      </Container>
      <BottomNav />
    </>
  );
};

export default BookSearchPage;

const Container = tw.div`
  bg-white
  h-screen
`;

const BackGroundWrap = tw.div`
  fixed
  top-0
  left-[50%]
  translate-x-[-50%]
  max-w-xl
  w-full
  h-80
  bg-white
  z-10
`;
const BackGround = tw.div`
  w-full
  h-80
  relative
`;

const Title = tw.h1`
  absolute
  left-5
  bottom-20
  text-3xl
  font-bold
`;

const SearchInputWrap = tw.div`
  absolute
  w-[90%]
  left-5
  bottom-1.5
  mx-auto
`;

const BookSearchListsWrap = tw.div`
  pt-[21.875rem]
  pb-24
  bg-white
`;

const BookSearchLists = tw.div`
  w-[90%]
  mx-auto	
`;
