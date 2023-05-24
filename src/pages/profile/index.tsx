import { GetServerSideProps } from 'next';
import React from 'react';
import { useRecoilState } from 'recoil';

import Modal from '@/components/common/Modal';
import ProfileContents from '@/components/profile/ProfileContents';
import ProfileUser from '@/components/profile/ProfileUser';
import { modalStateAtom } from '@/recoil/modal';

const ProfilePage = () => {
  const [modal, setModal] = useRecoilState(modalStateAtom);

  return (
    <div className='h-screen p-5 border-2 border-red-500'>
      <ProfileUser />
      <ProfileContents />
      <button onClick={() => setModal({ ...modal, type: 'BOOKS' })}>
        책장 모달
      </button>
      <button onClick={() => setModal({ ...modal, type: 'SETTING' })}>
        세팅 모달
      </button>
      {modal.type === 'BOOKS' && <Modal>Books</Modal>}
      {modal.type === 'SETTING' && <Modal>Setting</Modal>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  {
    /* 리액트 쿼리로 프로필 정보, 글 리스트 불러오기 */
  }
  return { props: {} };
};

export default ProfilePage;
