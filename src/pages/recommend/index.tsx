import React, { ReactElement } from 'react';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import BookRecommendGuide from '@/components/recommend/BookRecommendGuide';
import RecommendLayout from '@/layout/RecommendLayout';

const RecommendPage = () => {
  return (
    <AuthRequiredPage>
      <BookRecommendGuide />
    </AuthRequiredPage>
  );
};

RecommendPage.getLayout = function getLayout(page: ReactElement) {
  return <RecommendLayout>{page}</RecommendLayout>;
};

export default RecommendPage;
