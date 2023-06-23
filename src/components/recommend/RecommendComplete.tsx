import React from 'react';
import { useRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import { selectRecommendResultModalAtom } from '@/recoil/modal';

import RecommendResultModal from './RecommendResultModal';
const RecommendComplete = ({ userRequest }: { userRequest: string }) => {
  const [modal, setModal] = useRecoilState(selectRecommendResultModalAtom);

  return (
    <div className='flex flex-col items-center justify-between h-full px-8 bg-background'>
      <Header className='pl-0 mt-14' />
      <div className='w-full'>
        <h2 className='mb-5 text-lg font-semibold text-center'>나의 답변</h2>
        <p className='w-full text-center border-b'>
          &quot;{userRequest}&ldquo;
        </p>
      </div>
      <div className='relative w-full h-2/4 bg-white border-dashed border border-[#707070] rounded-2xl flex justify-center items-center flex-col'>
        <div className='mb-14'>
          <p className='text-6xl text-[#C2C1C180] font-bold mb-4 text-center'>
            ?
          </p>
          <p className='text-xl text-[#333333] font-semibold'>
            나에게 맞는 책은
          </p>
        </div>
      </div>
      <button
        onClick={() => setModal(true)}
        className='w-full text-white rounded-lg h-14 bg-main disabled:bg-[#DFDFDF] shadow-round mb-8'
      >
        확인하기
      </button>
      {modal && <RecommendResultModal />}
    </div>
  );
};

export default RecommendComplete;
