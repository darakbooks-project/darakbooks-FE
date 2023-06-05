import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';

import InfinityScrollLists from '@/components/book/search/InfinityScrollLists';
import BottomNav from '@/components/common/BottomNav';
import SearchInput from '@/components/common/SearchInput';
import { isAuthorizedSelector } from '@/recoil/auth';

const BookSearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const setIsAuthorized = useSetRecoilState(isAuthorizedSelector);

  const onSubmit = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const clickLogout = () => {
    setIsAuthorized(false);
  };

  return (
    <Container>
      <SearchInput onSubmit={onSubmit} />
      <button onClick={clickLogout}>로그아웃</button>
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
