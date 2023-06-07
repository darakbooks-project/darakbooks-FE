import React from 'react';
import { ReactElement } from 'react';

import BookSelectLayout from '@/layout/BookSelectLayout';
import { NextPageWithLayout } from '@/types/layout';

const BookRecordSearchPage: NextPageWithLayout = () => {
  return <></>;
};

BookRecordSearchPage.getLayout = function getLayout(page: ReactElement) {
  return <BookSelectLayout>{page}</BookSelectLayout>;
};

export default BookRecordSearchPage;
