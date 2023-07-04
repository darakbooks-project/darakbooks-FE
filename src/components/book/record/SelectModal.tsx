import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSetRecoilState } from 'recoil';

import { selectModalStateAtom } from '@/recoil/modal';
import { selectBookProps } from '@/types/modal';

const BackDrop = () => {
  const setModal = useSetRecoilState(selectModalStateAtom);
  return (
    <div
      className='fixed w-full max-w-xl mx-auto h-screen z-20 bg-[rgba(0,0,0,0.6)] top-0'
      onClick={() => setModal(false)}
    />
  );
};

const ModalOverlay = ({ isbn, thumbnail, title, author }: selectBookProps) => {
  const setModal = useSetRecoilState(selectModalStateAtom);
  const router = useRouter();

  const routeDetailPage = () => {
    router.push({ pathname: '/book/detail', query: { isbn } });
    setModal(false);
  };
  const routeRecordPage = () => {
    router.push({ pathname: '/book/record', query: { isbn } });
    setModal(false);
  };

  return (
    <div className='fixed s:w-[575px] w-screen bg-white h-72 z-30 rounded-[30px_30px_0px_0px] bottom-0 animate-slideUp'>
      <Image
        src={thumbnail}
        alt={title}
        width='0'
        height='0'
        sizes='100vw'
        className='absolute w-[8.5em] h-[12em] top-[-7rem] -translate-x-2/4 translate-y-[-5%] rounded-[0px_3px_3px_0px] left-2/4 drop-shadow-[0_0_8px_rgba(0,0,0,0.25)]'
      />
      <button
        className='absolute right-8 top-6'
        onClick={() => setModal(false)}
      >
        <Image
          src='/images/record/select/exit.svg'
          alt='exit'
          width={32}
          height={32}
        />
      </button>
      <article className='absolute -translate-x-2/4 translate-y-[-20%] flex flex-col items-center justify-center w-full leading-6 left-2/4 top-24'>
        <h4 className='text-lg text-[#242424]'>{title}</h4>
        <h5 className='text-[13px] text-[#707070]'>{author} 지음</h5>
      </article>
      <span
        className='flex justify-center items-center absolute -translate-x-2/4 -translate-y-1/4 pb-3 text-[#707070] text-[13px]  text-center left-1/2 bottom-[5rem] w-full border-b-[#EBEAEA] border-b border-solid'
        onClick={routeDetailPage}
      >
        <Image
          src='/images/record/select/info.svg'
          alt='info'
          width={32}
          height={32}
        />
        책 상세보기
      </span>
      <button
        className='absolute w-[90%] h-[3.6rem] -translate-x-2/4 -translate-y-1/4 text-base text-white bg-main rounded-md border-[none] left-2/4 bottom-[0.2rem]'
        onClick={routeRecordPage}
      >
        책 등록
      </button>
    </div>
  );
};

const SelectModal = ({ isbn, thumbnail, title, author }: selectBookProps) => {
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
      {ReactDOM.createPortal(
        <ModalOverlay
          isbn={isbn}
          thumbnail={thumbnail}
          title={title}
          author={author}
        />,
        element,
      )}
    </>
  ) : null;
};

export default SelectModal;
