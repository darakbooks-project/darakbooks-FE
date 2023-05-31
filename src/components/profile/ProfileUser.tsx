import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';

import { registerImageApi } from '@/api/image';
import useImage from '@/hooks/useImage';
import useInput from '@/hooks/useInput';

const ProfileUser = () => {
  const registerImage = useMutation(registerImageApi);

  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useImage(
    { name: '', url: '' },
    registerImage,
  );
  const [nickname, setNickname] = useInput('api에서 받아온 닉네임');
  const [bio, setBio] = useInput('api에서 받아온 bio');

  const submitEditing = () => {
    {
      /* 프로필 수정 api 호출, 성공시 setEditing => false */
    }
    console.log(profileImage, nickname, bio);
  };

  return (
    <div>
      {editing ? (
        <div className='flex flex-col'>
          <label htmlFor='profile-image' className='border-basic'>
            {profileImage ? (
              <Image alt='profile-image' src='' width={100} height={100} />
            ) : (
              <div>이미지를 선택해주세요</div>
            )}
          </label>
          <input
            className='hidden'
            type='file'
            id='profile-image'
            accept='image/*'
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
          <div>
            <Image alt='profile-image' src='' width={100} height={100} />
          </div>
          <div>닉네임</div>
          <div>소개글</div>
        </>
      )}

      {!editing && <button onClick={() => setEditing(true)}>프로필수정</button>}
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
  );
};

export default ProfileUser;
