import React, { ReactElement } from 'react';

import RecruitLayout from '@/layout/RecruitLayout';
import { NextPageWithLayout } from '@/types/layout';

const RecruitChattingPage: NextPageWithLayout = () => {
  return <>chatting</>;
};

RecruitChattingPage.getLayout = function getLayout(page: ReactElement) {
  return <RecruitLayout>{page}</RecruitLayout>;
};
export default RecruitChattingPage;
