import React, { ReactElement } from 'react';

import Layout from '@/layout/Layout';
import RecruitLayout from '@/layout/RecruitLayout';
import { NextPageWithLayout } from '@/types/layout';

const RecruitChattingPage: NextPageWithLayout = () => {
  return <>chatting</>;
};

RecruitChattingPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <RecruitLayout>{page}</RecruitLayout>
    </Layout>
  );
};
export default RecruitChattingPage;
