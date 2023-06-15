import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { changeProfileApi, getMyProfileApi } from '@/api/profile';
import { registerImageApi } from '@/api/record';
import useImage from '@/hooks/useImage';
import useInput from '@/hooks/useInput';

const Edit = () => {
  const router = useRouter();
  const registerImage = useMutation(registerImageApi);
  const changeProfile = useMutation(changeProfileApi);
  const [nickname, setNickname, reset] = useInput('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useImage({}, registerImage);

  const { data: getMyProfile, status } = useQuery(
    ['getMyProfile', 'profile'],
    () => getMyProfileApi(),
  );

  const [secretMode, setSecretMode] = useState<'PUBLIC' | 'PRIVATE'>(
    getMyProfile?.bookshelfIsHidden ? 'PUBLIC' : 'PRIVATE',
  );

  const changeBio = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const resetNickname = () => {
    reset();
  };

  const submitEdit = () => {
    const editData = {
      nickname: (nickname as string) || getMyProfile?.nickname,
      photoId: profileImage.name,
      photoUrl: profileImage.url,
      userInfo: bio,
      bookshelfIsHidden: secretMode === 'PUBLIC' ? true : false,
    };

    changeProfile.mutate(editData, {
      onSuccess: () => {
        alert('프로필 수정을 완료하였습니다.');
        router.push('/profile');
      },
      onError: (error) => console.error(error),
    });
  };

  return (
    <>
      {status === 'success' && (
        <>
          <div className='h-screen flex flex-col items-center gap-12 px-6 py-12'>
            <section className='w-full flex justify-between'>
              <button
                onClick={() => {
                  router.back();
                }}
                className=''
              >
                &lt;
              </button>
              <h1 className='text-base text-[#333333]'>프로필 수정</h1>
              <div className='invisible'></div>
            </section>
            <main className='flex flex-col items-center w-full gap-6  s:pb-36'>
              <section className='relative'>
                {profileImage.url ? (
                  <Image
                    src={profileImage.url}
                    alt='프로필 이미지'
                    width='0'
                    height='0'
                    sizes='100vw'
                    className='w-[6.5rem] h-[6.5rem] bg-[#ebeaea] border rounded-[50%] border-solid border-[#c2c1c1]'
                  />
                ) : (
                  <Image
                    src={getMyProfile?.photoUrl}
                    alt={getMyProfile.nickname}
                    width='0'
                    height='0'
                    sizes='100vw'
                    className='w-[6.5rem] h-[6.5rem] bg-[#ebeaea] border rounded-[50%] border-solid border-[#c2c1c1]'
                  />
                )}

                <label
                  className='absolute w-7 h-7 bg-[#ebeaea] border rounded-[50%] border-solid border-[#c2c1c1] right-0 bottom-[0.4rem]'
                  htmlFor='edit-photo'
                ></label>
                <input
                  className='hidden'
                  type='file'
                  accept='image/*'
                  id='edit-photo'
                  onChange={setProfileImage}
                />
              </section>
              <section className='relative w-full flex flex-col'>
                <label
                  className='text-[15px] text-[#707070] mb-2.5'
                  htmlFor='nickname'
                >
                  닉네임
                </label>
                <input
                  className='h-14 border font-normal text-sm text-[#333333] p-4 rounded-md border-solid border-[#c2c1c1]'
                  id='nickname'
                  placeholder={getMyProfile.nickname}
                  value={nickname}
                  onChange={setNickname}
                />
                <button
                  className='absolute w-6 h-6 flex justify-center items-center rounded-[50%] right-[15px] top-[3rem] bg-[#f3f3f3]'
                  onClick={resetNickname}
                >
                  X
                </button>
              </section>
              <section className='w-full flex flex-col'>
                <label
                  className='text-[15px] text-[#707070] mb-2.5'
                  htmlFor='bio'
                >
                  소개
                </label>
                <textarea
                  className='h-[7.5rem] border font-normal text-sm text-[#333333] resize-none p-4 rounded-md border-solid border-[#c2c1c1]'
                  id='bio'
                  placeholder={
                    getMyProfile.userInfo || '좋아하는 것을 일고 기록해요 :)'
                  }
                  value={bio}
                  onChange={changeBio}
                ></textarea>
              </section>
              <section className='w-full flex flex-col'>
                <h5 className='font-normal text-sm text-[#707070] mb-4 px-0 py-4 border-b-[#dfdfdf] border-b border-solid'>
                  공개범위
                </h5>
                <div>
                  <article className='flex justify-between items-center mb-2'>
                    <div>
                      <input
                        className='mr-4'
                        type='radio'
                        name='public-private'
                        defaultChecked={secretMode === 'PUBLIC'}
                        onClick={() => setSecretMode('PUBLIC')}
                      />
                      <span className='font-medium text-sm text-[#707070]'>
                        공개
                      </span>
                    </div>
                    <p className='not-italic font-normal text-[11px] text-[#999797]'>
                      나의 모든 게시글, 책장, 기록 전체 공개
                    </p>
                  </article>
                  <article className='flex justify-between items-center mb-2'>
                    <div>
                      <input
                        className='mr-4'
                        type='radio'
                        name='public-private'
                        defaultChecked={secretMode === 'PRIVATE'}
                        onClick={() => setSecretMode('PRIVATE')}
                      />
                      <span className='font-medium text-sm text-[#707070]'>
                        비공개
                      </span>
                    </div>
                    <p className='not-italic font-normal text-[11px] text-[#999797]'>
                      나의 모든 게시글, 책장, 기록 전체 비공개
                    </p>
                  </article>
                </div>
              </section>
            </main>
          </div>
          <section className='s:w-[575px] w-full fixed p-4 border-t-[#ebeaea] border-t border-solid bottom-0 bg-[#f3f3f3]'>
            <button
              className='flex justify-center items-center w-full h-[3.125rem] bg-[#67a68a] text-white rounded-md'
              onClick={submitEdit}
            >
              저장하기
            </button>
          </section>
        </>
      )}
    </>
  );
};

export default Edit;
