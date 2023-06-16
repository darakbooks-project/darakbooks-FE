import React from 'react';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import Header from '@/components/common/Header';
import MemberListItem from '@/components/recruit/detail/member/MemberListItem';

const GROUPMEMBER = {
  userGroup: [
    {
      userId: 1,
      nickname: '민아',
      profileImg: 'https://via.placeholder.com/40',
      userInfo: '계속해서 책 읽기!',
      gender: 'female',
      age: '23',
      provider: 'kakao',
      groups: [2, 3, 4],
    },
    {
      userId: 2,
      nickname: '민아',
      profileImg: 'https://via.placeholder.com/40',
      userInfo: '얌냠냠',
      gender: 'female',
      age: '23',
      provider: 'kakao',
      groups: [2, 3, 4],
    },
    {
      userId: 3,
      nickname: '민아',
      profileImg: 'https://via.placeholder.com/40',
      userInfo: '움냠얀',
      gender: 'female',
      age: '23',
      provider: 'kakao',
      groups: [2, 3, 4],
    },
  ],
};

const member = () => {
  return (
    <AuthRequiredPage>
      <div className='h-full bg-white'>
        <div className='pb-5 pt-14'>
          <Header title='참여인원' />
        </div>
        <div className=' border border-[#EBEAEA]' />
        <section className='px-5 '>
          <p className=' py-4 text-[#67A68A] text-sm'>
            멤버 {GROUPMEMBER.userGroup.length}
          </p>
          <ul>
            {GROUPMEMBER.userGroup.map((user) => (
              <MemberListItem key={user.userId} {...user} />
            ))}
          </ul>
        </section>
      </div>
    </AuthRequiredPage>
  );
};

export default member;
