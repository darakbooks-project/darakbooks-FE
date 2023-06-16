import React from 'react';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';

const Edit = () => {
  return (
    <AuthRequiredPage>
      <h1>프로필 수정 페이지</h1>
    </AuthRequiredPage>
  );
};

export default Edit;
