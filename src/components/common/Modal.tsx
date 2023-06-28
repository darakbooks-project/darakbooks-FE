import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useRecoilState } from 'recoil';

import { modalStateAtom } from '@/recoil/modal';

const BackDrop = () => {
  const [modal, setModal] = useRecoilState(modalStateAtom);

  return (
    <div
      className='fixed w-full max-w-xl mx-auto h-screen z-20 bg-[rgba(0,0,0,0.6)] top-0'
      onClick={() => setModal({ type: 'HIDDEN' })}
    />
  );
};

const ModalOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='fixed bg-[white] shadow-[0_2px_8px_rgba(0,0,0,0.6)] z-30 p-4 rounded-[14px] inset-x-0 w-5/6 animate-slideDown overflow-hidden top-[50%] mx-auto translate-y-1/2'>
      {children}
    </div>
  );
};

const Modal = ({ children }: { children: React.ReactNode }) => {
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
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, element)}
    </>
  ) : null;
};

export default Modal;
