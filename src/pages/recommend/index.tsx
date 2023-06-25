import React from 'react';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import BookRecommendGuide from '@/components/recommend/BookRecommendGuide';

const RecommendPage = () => {
  return (
    <AuthRequiredPage>
      <BookRecommendGuide />
    </AuthRequiredPage>
  );
};

export default RecommendPage;
