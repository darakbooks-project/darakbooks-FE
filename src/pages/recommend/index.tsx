import React from 'react';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import Seo from '@/components/common/Seo';
import BookRecommendGuide from '@/components/recommend/BookRecommendGuide';

const RecommendPage = () => {
  return (
    <AuthRequiredPage>
      <Seo title='다락책방 | 도서 추천' />
      <BookRecommendGuide />
    </AuthRequiredPage>
  );
};

export default RecommendPage;
