import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSetRecoilState } from 'recoil';

import { modalStateAtom } from '@/recoil/modal';

const BackDrop = () => {
  const setModal = useSetRecoilState(modalStateAtom);
  return (
    <div
      className='fixed w-full h-screen z-20 bg-[rgba(0,0,0,0.75)] left-0 top-0'
      onClick={() => setModal(false)}
    />
  );
};

const ModalOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='fixed bg-[white] shadow-[0_2px_8px_rgba(0,0,0,0.25)] z-30 p-4 rounded-[14px] top-12 mx-auto inset-x-0 w-[21rem] animate-slideDown'>
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
