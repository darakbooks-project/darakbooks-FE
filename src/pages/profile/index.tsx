import React from 'react';
import { useRecoilState } from 'recoil';

import Modal from '@/components/common/Modal';
import { modalStateAtom } from '@/recoil/modal';

const ProfilePage = () => {
  const [modal, setModal] = useRecoilState(modalStateAtom);

  return (
    <div className='h-screen p-5 border-2 border-red-500'>
      <button onClick={() => setModal(true)}>모달 on</button>
      {modal && <Modal>모달 내용</Modal>}
    </div>
  );
};

export default ProfilePage;
