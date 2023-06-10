import Link from 'next/link';
import React from 'react';

import Avatar from '@/components/common/Avartar';
import RecruitNotification from '@/components/recruit/detail/RecruitNotification';
import RecruitParticipationControl from '@/components/recruit/detail/RecruitParticipationControl';
import { NextPageWithLayout } from '@/types/layout';

const DUMMY = {
  group_id: 1,
  name: '책 읽는 행복한 모임',
  recruitment_status: true,
  meeting_type: 'offline',
  day: '월요일',
  time: '15:00',
  region: '서울 강서구',
  description: '자유롭게 책을 읽고 공유하는 모임 입니다.',
  participant_limit: 20,
  open_chat_link: 'https://naver.com',
  group_lead: '1',
  isLeader: false,
  isMember: false,
  userGroup: [
    {
      user_id: '1',
      nickname: '민아',
      profileImg: 'https://via.placeholder.com/40',
      userInfo: 'user_info',
      gender: 'female',
      age: '23',
      provider: 'kakao',
      groups: [1, 3, 4],
    },
    {
      user_id: '2',
      nickname: '여우',
      profileImg: 'https://via.placeholder.com/40',
      userInfo: 'user_info',
      gender: 'female',
      age: '23',
      provider: 'kakao',
      groups: [1, 3, 4],
    },
  ],
};

const GROUPLEADER = {
  user_id: '1',
  nickname: '민아',
  profileImg: 'https://via.placeholder.com/40',
  userInfo: 'user_info',
  gender: 'female',
  age: '23',
  provider: 'kakao',
  groups: [2, 3, 4],
};

const RecruitDetailPage: NextPageWithLayout = () => {
  const NotificationState = [
    { title: '요일/시간', detail: `매주 ${DUMMY.day} ${DUMMY.time}` },
    { title: '활동 장소', detail: `매주 ${DUMMY.region}` },
    {
      title: '참여 인원',
      detail: `${DUMMY.userGroup.length}/${DUMMY.participant_limit}`,
    },
    { title: '소통 방법', detail: `${DUMMY.open_chat_link}` },
  ];

  return (
    <div className='h-full bg-white'>
      <div className='w-full h-[17.5rem] bg-[#FFFCEA]' />
      <main className='flex flex-col bg-white relative -top-10 px-5 rounded-t-[1.875rem] pb-20'>
        <div className='flex py-6'>
          <Avatar
            src={GROUPLEADER.profileImg}
            shape='circle'
            placeholder=''
            lazy={false}
            alt='모임장 프로필 이미지'
            width='w-[3.375rem]'
            height='h-[3.375rem]'
          />
          <div className='pl-4'>
            <h3 className='text-sm text-[#67A68A]'>
              {DUMMY.recruitment_status ? '모집중' : '모집완료'}
            </h3>
            <h1 className='text-xl font-bold'>{DUMMY.name}</h1>
          </div>
        </div>
        <p>{DUMMY.description}</p>
        <div className='w-full h-[1px] bg-[#EBEAEA] my-8' />
        <h3 className='text-[#67A68A] text-sm'>자세한 정보 알려드려요</h3>
        <h2 className='text-xl pt-1 font-bold pb-6'>안내사항</h2>
        {NotificationState.map(({ title, detail }) => (
          <RecruitNotification
            key={title}
            title={title}
            detail={detail}
            meetingType={DUMMY.meeting_type === 'online'}
            isMember={DUMMY.isMember}
          />
        ))}
        <div className='w-full h-[1px] bg-[#EBEAEA] my-8' />
        <h3 className='text-[#67A68A] text-sm'>
          함께 독서하며 소통하고 있어요
        </h3>
        <div className='flex justify-between items-center pb-5'>
          <h2 className='text-xl pt-1 font-bold'>멤버 소개</h2>
          <Link href={`/recruit/detail/member`}>전체보기</Link>
        </div>
        <div className='flex'>
          {DUMMY.userGroup.map((member) => (
            <div key={member.user_id} className='pr-2'>
              {/**해당 아바타 클릭 시 해당 유저의 책장 페이지로 이동 */}
              <Avatar
                src={member.profileImg}
                shape='circle'
                alt='구성원 프로필 이미지'
                lazy={false}
                placeholder=''
                width='w-[3.1875rem]'
                height='h-[3.1875rem]'
              />
            </div>
          ))}
        </div>
      </main>
      {!DUMMY.isLeader && (
        <RecruitParticipationControl
          isMember={DUMMY.isMember}
          recruitmentStatus={DUMMY.recruitment_status}
        />
      )}
    </div>
  );
};

export default RecruitDetailPage;
