import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { changeProfileApi, getProfileApi } from '@/api/profile';
import { registerImageApi } from '@/api/record';
import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
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
    ['getMyProfile', 'profile', 'myprofile'],
    () => getProfileApi(),
  );

  const [secretMode, setSecretMode] = useState<'PUBLIC' | 'PRIVATE'>(
    getMyProfile?.bookshelfIsHidden ? 'PRIVATE' : 'PUBLIC',
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
      bookshelfIsHidden: secretMode === 'PUBLIC' ? false : true,
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
    <AuthRequiredPage>
      {status === 'success' && (
        <>
          <div className='flex flex-col items-center h-screen gap-12 px-6 py-12'>
            <section className='flex justify-between w-full'>
              <Image
                src='/images/profile/edit/back.svg'
                alt='back'
                width={32}
                height={32}
                onClick={() => {
                  router.back();
                }}
              />

              <h1 className='text-base text-[#333333]'>프로필 수정</h1>
              <div className='invisible w-[32px]'></div>
            </section>
            <main className='flex flex-col items-center w-full gap-6 s:pb-36'>
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
                  className='absolute w-[6.5rem] h-[6.5rem] rounded-[50%]  z-10 bottom-0 bg-black opacity-50 flex justify-center items-center'
                  htmlFor='edit-photo'
                >
                  <Image
                    src='/images/profile/edit/image.svg'
                    alt='image'
                    width={32}
                    height={32}
                  />
                </label>
                <input
                  className='hidden'
                  type='file'
                  accept='image/*'
                  id='edit-photo'
                  onChange={setProfileImage}
                />
              </section>
              <section className='relative flex flex-col w-full'>
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

                <Image
                  src='/images/profile/edit/delete.svg'
                  alt='delete'
                  width={32}
                  height={32}
                  onClick={resetNickname}
                  className='absolute right-[15px] top-[2.8rem]'
                />
              </section>
              <section className='flex flex-col w-full'>
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
              <section className='flex flex-col w-full'>
                <h5 className='font-normal text-sm text-[#707070] mb-4 px-0 py-2 border-b-[#dfdfdf] border-b border-solid'>
                  공개범위
                </h5>
                <div>
                  <article className='flex items-center justify-between mb-2'>
                    <div>
                      <input
                        className='mr-4 accent-main'
                        type='radio'
                        name='public-private'
                        defaultChecked={secretMode === 'PUBLIC'}
                        onClick={() => setSecretMode('PUBLIC')}
                      />
                      <span className='font-medium text-sm text-[#707070]'>
                        공개
                      </span>
                    </div>
                    <p
                      className={
                        secretMode === 'PUBLIC'
                          ? 'font-normal text-[11px] text-[#60B28D]'
                          : 'font-normal text-[11px] text-[#999797]'
                      }
                    >
                      마이페이지 전체 공개
                    </p>
                  </article>
                  <article className='flex items-center justify-between mb-2'>
                    <div>
                      <input
                        className='mr-4 accent-main'
                        type='radio'
                        name='public-private'
                        defaultChecked={secretMode === 'PRIVATE'}
                        onClick={() => setSecretMode('PRIVATE')}
                      />
                      <span className='font-medium text-sm text-[#707070]'>
                        비공개
                      </span>
                    </div>
                    <p
                      className={
                        secretMode === 'PRIVATE'
                          ? 'font-normal text-[11px] text-[#60B28D]'
                          : 'font-normal text-[11px] text-[#999797]'
                      }
                    >
                      마이페이지 전체 비공개
                    </p>
                  </article>
                </div>
              </section>
            </main>
          </div>
          <section className='s:w-[575px] w-full fixed p-4 border-t-[#ebeaea] border-t border-solid bottom-0 bg-[#f3f3f3]'>
            <button
              className='flex justify-center items-center w-full h-[3.125rem] bg-main text-white rounded-md'
              onClick={submitEdit}
            >
              저장하기
            </button>
          </section>
        </>
      )}
    </AuthRequiredPage>
  );
};

export default Edit;
