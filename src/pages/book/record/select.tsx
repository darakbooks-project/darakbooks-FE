import Image from 'next/image';
import React from 'react';
import { ReactElement } from 'react';
import { useRecoilState } from 'recoil';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import SelectModal from '@/components/book/record/SelectModal';
import BookSelectLayout from '@/layout/BookSelectLayout';
import { selectModalStateAtom } from '@/recoil/modal';
import { NextPageWithLayout } from '@/types/layout';

const BookRecordSelectPage: NextPageWithLayout = () => {
  const [modal, setModal] = useRecoilState(selectModalStateAtom);
  return (
    <AuthRequiredPage>
      <div>
        <h5 className='text-[13px]'>
          전체 <span className='text-[#67a68a]'>6</span>권
        </h5>
      </div>
      <ul
        className='grid grid-cols-[repeat(3,1fr)] grid-rows-[repeat(4,1fr)] gap-4 overflow-hidden'
        onClick={() => setModal(true)}
      >
        <li className='flex flex-col items-center justify-center h-48'>
          <div className='w-full h-[9.5rem] border mb-2.5 rounded-[0px_3px_3px_0px] border-solid border-[red] shadow-[0px_0px_7px_rgba(0,0,0,0.25)]'>
            <Image src='' alt='' />
          </div>
          <h2 className='w-full text-[13px] text-[#333333] mx-0 my-[5px] text-center'>
            긴긴밤
          </h2>
          <h3 className='w-full text-[11px] text-[#707070] text-center'>
            루리
          </h3>
        </li>
      </ul>
      {modal && <SelectModal />}
    </AuthRequiredPage>
  );
};

BookRecordSelectPage.getLayout = function getLayout(page: ReactElement) {
  return <BookSelectLayout>{page}</BookSelectLayout>;
};

export default BookRecordSelectPage;
