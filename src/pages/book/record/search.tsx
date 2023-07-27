import React, { useEffect } from 'react';
import { ReactElement } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import SelectModal from '@/components/book/record/SelectModal';
import InfinityScrollLists from '@/components/book/search/InfinityScrollLists';
import SearchInput from '@/components/common/SearchInput';
import Seo from '@/components/common/Seo';
import BookSelectLayout from '@/layout/BookSelectLayout';
import { searchBookTitleAtom } from '@/recoil/book';
import { selectModalDataAtom, selectModalStateAtom } from '@/recoil/modal';
import { NextPageWithLayout } from '@/types/layout';

const BookRecordSearchPage: NextPageWithLayout = () => {
  const [searchBookTitle, setSearchBookTitle] =
    useRecoilState(searchBookTitleAtom);
  const modal = useRecoilValue(selectModalStateAtom);
  const sendData = useRecoilValue(selectModalDataAtom);
  const onSubmit = (keyword: string) => {
    setSearchBookTitle(keyword);
  };

  useEffect(() => {
    setSearchBookTitle('');
  }, [setSearchBookTitle]);

  return (
    <>
      <Seo title='다락책방 | 검색' />
      <SearchInput onSubmit={onSubmit} />
      <InfinityScrollLists searchKeyword={searchBookTitle} />
      {modal && (
        <SelectModal
          isbn={sendData.isbn}
          title={sendData.title}
          thumbnail={sendData.thumbnail}
          author={sendData.author}
        />
      )}
    </>
  );
};

BookRecordSearchPage.getLayout = function getLayout(page: ReactElement) {
  return <BookSelectLayout>{page}</BookSelectLayout>;
};

export default BookRecordSearchPage;
