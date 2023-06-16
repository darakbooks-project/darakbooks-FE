import React from 'react';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import BottomNav from '@/components/common/BottomNav';

const RecommendGamePage = () => {
  return (
    <AuthRequiredPage>
      <div>추천 페이지(게임)</div>
      <BottomNav />
    </AuthRequiredPage>
  );
};

export default RecommendGamePage;
