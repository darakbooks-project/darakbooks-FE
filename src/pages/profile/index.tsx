import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import Modal from '@/components/common/Modal';
import useImage from '@/hooks/useImage';
import useInput from '@/hooks/useInput';
import { modalStateAtom } from '@/recoil/modal';

const DUMMY1 = Array.from({ length: 6 }, (_, idx) => `내 책장${idx}`);
const DUMMY2 = Array.from({ length: 6 }, (_, idx) => `전체 피드${idx}`);
const DUMMY3 = Array.from({ length: 6 }, (_, idx) => `마이 독서 모임${idx}`);

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [option, setOption] = useState('books');
  const [profileImage, setProfileImage] = useImage(
    { id: '1', url: '' },
    'PROFILE',
  );
  const [nickname, setNickname] = useInput('api에서 받아온 닉네임');
  const [bio, setBio] = useInput('api에서 받아온 bio');
  const [modal, setModal] = useRecoilState(modalStateAtom);

  const submitEditing = () => {
    {
      /* 프로필 수정 api 호출, 성공시 setEditing => false */
    }
    console.log(profileImage, nickname, bio);
  };

  return (
    <div className='h-screen p-5 border-2 border-red-500'>
      <div>
        {editing ? (
          <div className='flex flex-col'>
            <label htmlFor='profile-image' className='border-basic'>
              {profileImage ? (
                <Image alt='profile-image' src={profileImage.url} />
              ) : (
                <div>이미지를 선택해주세요</div>
              )}
            </label>
            <input
              className='hidden'
              type='file'
              id='profile-image'
              onChange={setProfileImage}
            />
            <input
              type='text'
              className='border-basic'
              value={nickname}
              onChange={setNickname}
            />
            <input
              className='border-basic'
              type='text'
              value={bio}
              onChange={setBio}
            />
          </div>
        ) : (
          <>
            <div>프로필사진</div>
            <div>닉네임</div>
            <div>소개글</div>
          </>
        )}

        {!editing && (
          <button onClick={() => setEditing(true)}>프로필수정</button>
        )}
        {editing && (
          <>
            <button className='border-basic' onClick={() => submitEditing()}>
              완료
            </button>
            <button className='border-basic' onClick={() => setEditing(false)}>
              취소
            </button>
          </>
        )}
      </div>
      <div>
        <button onClick={() => setOption('books')} className='border-basic p-2'>
          내 책장
        </button>
        <button onClick={() => setOption('feed')} className='border-basic p-2'>
          전체 피드
        </button>
        <button
          onClick={() => setOption('recruit')}
          className='border-basic p-2'
        >
          마이 독서 모임
        </button>
      </div>
      {/* 프로필 정보, 글 리스트들 불러오는 건 SSR로 하기 */}
      {option === 'books' && (
        <div className='grid grid-cols-3'>
          {DUMMY1.map((item, idx) => (
            <div key={idx}>{item}</div>
          ))}
        </div>
      )}
      {option === 'feed' && (
        <div className='grid grid-cols-3'>
          {DUMMY2.map((item, idx) => (
            <div key={idx}>{item}</div>
          ))}
        </div>
      )}
      {option === 'recruit' && (
        <div className='grid grid-cols-3'>
          {DUMMY3.map((item, idx) => (
            <div key={idx}>{item}</div>
          ))}
        </div>
      )}
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
