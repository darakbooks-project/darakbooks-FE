import React, { ReactNode } from 'react';

import RecruitTab from '@/components/recruit/RecruitTab';

import Layout from './Layout';

function RecruitLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <RecruitTab />
      {children}
    </Layout>
  );
}

export default RecruitLayout;
