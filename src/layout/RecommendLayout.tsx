import React, { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

import BottomNav from '@/components/common/BottomNav';
import { isAuthorizedSelector } from '@/recoil/auth';

const RecommendLayout = ({ children }: { children: ReactNode }) => {
  const isAuthorized = useRecoilValue(isAuthorizedSelector);

  return (
    <>
      <div
        className={`${isAuthorized ? 'pb-20 h-full bg-background' : 'h-full'}`}
      >
        {children}
      </div>
      {isAuthorized && <BottomNav />}
    </>
  );
};

export default RecommendLayout;
