import Image from 'next/image';
import React from 'react';

import Avatar from '@/components/common/Avartar';
import { NextPageWithLayout } from '@/types/layout';

const DUMMY = {
  data: {
    groupId: 1,
    groupName: '독서모임~',
    groupImg: 'https://via.placeholder.com/400x200',
    endDate: '2023-06-10',
    online: false,
    people: 10,
    location: '서울',
    description: '독서 모임입니다~',
    notice: '공지입니다',
    isAdmin: false,
    isMember: true,
    recruiting: true,
    admin: {
      userId: 1,
      nickname: '일이삼',
      profileImg: 'https://via.placeholder.com/40',
    },
    user: [
      {
        userId: 1,
        nickname: '일일일',
        profileImg: 'https://via.placeholder.com/40',
      },
      {
        userId: 2,
        nickname: '이이이',
        profileImg: 'https://via.placeholder.com/40',
      },
      {
        userId: 3,
        nickname: '삼삼삼',
        profileImg: 'https://via.placeholder.com/40',
      },
    ],
  },
};

const RecruitDetailPage: NextPageWithLayout = () => {
  return (
    <main className='flex flex-col'>
      {DUMMY.data.isMember && DUMMY.data.notice && (
        <p className='bg-slate-100'>{DUMMY.data.notice}</p>
      )}
      <h1>{DUMMY.data.groupName}</h1>
      <Image
        src={DUMMY.data.groupImg}
        width={400}
        height={200}
        alt='모임 설명 이미지'
        priority
      />
      <p>{DUMMY.data.recruiting ? '모집중' : '모집완료'}</p>
      <p>{DUMMY.data.online ? '온라인' : '오프라인'}</p>
      <p>{!DUMMY.data.online && DUMMY.data.location}</p>
      <p>{DUMMY.data.description}</p>
      <div className='flex items-center'>
        <span>모임장</span>
        <Avatar
          src={DUMMY.data.admin.profileImg}
          shape='circle'
          alt='모임장 프로필 이미지'
          lazy={false}
          placeholder=''
        />
      </div>
      <div className='flex'>
        {DUMMY.data.user.map((member) => (
          <Avatar
            key={member.userId}
            src={member.profileImg}
            shape='circle'
            alt='구성원 프로필 이미지'
            lazy={false}
            placeholder=''
          />
        ))}
      </div>
      {DUMMY.data.isAdmin ? (
        <input type='text' className='border-basic' />
      ) : DUMMY.data.isMember ? (
        <button>탈퇴</button>
      ) : (
        <button>가입</button>
      )}
    </main>
  );
};

export default RecruitDetailPage;
