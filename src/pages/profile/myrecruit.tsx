import React, { ReactElement } from 'react';

import ProfileLayout from '@/layout/ProfileLayout';

const myRecruit = () => {
  return <div>myRecruit</div>;
};

myRecruit.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default myRecruit;
