import React, { ReactElement } from 'react';

import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/types/layout';

const myRecruit: NextPageWithLayout = () => {
  return <div>myRecruit</div>;
};

myRecruit.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default myRecruit;
