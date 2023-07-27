import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';

import Header from '@/components/common/Header';
import SearchInput from '@/components/common/SearchInput';
import Seo from '@/components/common/Seo';
import {
  searchBookTitleAtom,
  searchInfinityScrollPositionAtom,
} from '@/recoil/book';

const InfinityScrollLists = dynamic(
  () => import('@/components/book/search/InfinityScrollLists'),
);
const BottomNav = dynamic(() => import('@/components/common/BottomNav'));

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
      <Seo
        title='다락책방 | 도서 검색'
        description='책을 검색할 수 있는 공간'
      />
      <Container>
        <BackGroundWrap>
          <HeaderStyle />
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
  h-[18.75rem]
  bg-white
`;

const HeaderStyle = tw(Header)`
  absolute
  top-12
  z-10
`;

const BackGround = tw.div`
  w-full
  h-[18.75rem]
  relative
`;

const Title = tw.h1`
  absolute
  left-5
  bottom-20
  text-clamp3xl
  leading-normal
`;

const SearchInputWrap = tw.div`
  absolute
  w-[90%]
  left-5
  bottom-2
  mx-auto
`;

const BookSearchListsWrap = tw.div`
  pt-[19.5rem]
  pb-24
  bg-white
`;

const BookSearchLists = tw.div`
  w-[90%]
  mx-auto	
`;
