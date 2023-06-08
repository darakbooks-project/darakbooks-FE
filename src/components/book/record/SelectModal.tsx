import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSetRecoilState } from 'recoil';

import { selectModalStateAtom } from '@/recoil/modal';

const BackDrop = () => {
  const setModal = useSetRecoilState(selectModalStateAtom);
  return (
    <div
      className='fixed w-full h-screen z-20 bg-[rgba(0,0,0,0.75)] left-0 top-0'
      onClick={() => setModal(false)}
    />
  );
};

const ModalOverlay = () => {
  const setModal = useSetRecoilState(selectModalStateAtom);

  return (
    <div className='fixed s:w-[575px] w-screen bg-white h-72 z-30 rounded-[30px_30px_0px_0px] bottom-0 animate-slideUp'>
      <div className='absolute w-[8.5em] h-[12em] top-[-7rem] bg-[red] -translate-x-2/4 translate-y-[-5%] rounded-[0px_3px_3px_0px] border-2 border-solid border-[red] left-2/4'>
        <Image src='' alt='' />
      </div>
      <button
        className='absolute right-8 top-6'
        onClick={() => setModal(false)}
      >
        X
      </button>
      <article className='absolute -translate-x-2/4 translate-y-[-20%] flex flex-col items-center justify-center w-full leading-6 left-2/4 top-24'>
        <h4 className='text-lg text-[#242424]'>아직 긴 인생이 남았습니다.</h4>
        <h5 className='text-[13px] text-[#707070]'>
          한국경제신문/기시미이치로 지음
        </h5>
      </article>
      <span className='absolute -translate-x-2/4 -translate-y-1/4 text-[#707070] text-[13px] w-full text-center left-2/4 bottom-[7rem]'>
        책 정보 보기
      </span>
      <button className='absolute w-[90%] h-[3.6rem] -translate-x-2/4 -translate-y-1/4 text-base text-white bg-[#67a68a] rounded-md border-[none] left-2/4 bottom-2'>
        책 등록
      </button>
    </div>
  );
};

const SelectModal = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const element =
    typeof window !== 'undefined' && document.getElementById('portal');

  return mounted && element ? (
    <>
      {ReactDOM.createPortal(<BackDrop />, element)}
      {ReactDOM.createPortal(<ModalOverlay />, element)}
    </>
  ) : null;
};

export default SelectModal;
