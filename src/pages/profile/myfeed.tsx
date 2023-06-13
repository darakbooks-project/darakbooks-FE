import Image from 'next/image';
import React, { ReactElement } from 'react';

import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/types/layout';

const myFeed: NextPageWithLayout = () => {
  return (
    <>
      <section className='grid grid-cols-[repeat(3,1fr)] gap-0.5'>
        <div className='h-32 border border-solid border-[tomato]'>
          <Image src='' alt='' />
        </div>
      </section>
    </>
  );
};

myFeed.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default myFeed;
