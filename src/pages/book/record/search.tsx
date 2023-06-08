import React from 'react';
import { ReactElement } from 'react';
import { useRecoilState } from 'recoil';

import SelectModal from '@/components/book/record/SelectModal';
import BookSelectLayout from '@/layout/BookSelectLayout';
import { selectModalStateAtom } from '@/recoil/modal';
import { NextPageWithLayout } from '@/types/layout';

const BookRecordSearchPage: NextPageWithLayout = () => {
  const [modal, setModal] = useRecoilState(selectModalStateAtom);

  return <>{modal && <SelectModal />}</>;
};

BookRecordSearchPage.getLayout = function getLayout(page: ReactElement) {
  return <BookSelectLayout>{page}</BookSelectLayout>;
};

export default BookRecordSearchPage;
