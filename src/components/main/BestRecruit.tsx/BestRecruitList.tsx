import React from 'react';

import { UserGroup } from '@/types/recruit';

import BestRecruitListItem from './BestRecruitListItem';

const BESTRECRUITDUMMY = [
  {
    group_id: 1,
    name: '도서관을 사랑하는 독서 모임 도',
    recruitment_status: true,
    meeting_type: 'online',
    day: '월요일',
    time: '15:00',
    region: '서울 강서구',
    description: '온라인 모임 함께하실 분~~ 재미있는 책 읽어요',
    participant_limit: 20,
    open_chat_link: '',
    group_lead: '1',
    userGroup: [
      {
        userId: '1',
        nickname: '책 먹는 여우',
        profileImg: 'https://via.placeholder.com/40',
        userInfo: 'user_info',
        gender: 'female',
        age: '23',
        provider: 'kakao',
        groups: [2, 3, 4],
      },
    ],
  },
  {
    group_id: 2,
    name: '낭독합시다',
    recruitment_status: true,
    meeting_type: 'online',
    day: '월요일',
    time: '15:00',
    region: '서울 강서구',
    participant_limit: 20,
    open_chat_link: '',
    description: '함께해요!',
    group_lead: '1',
    userGroup: [
      {
        userId: '1',
        nickname: '뽕따',
        profileImg: 'https://via.placeholder.com/40',
        userInfo: 'user_info',
        gender: 'female',
        age: '23',
        provider: 'kakao',
        groups: [2, 3, 4],
      },
    ],
  },
  {
    group_id: 3,
    name: '시 좋아하세요?',
    recruitment_status: false,
    meeting_type: 'online',
    day: '월요일',
    time: '15:00',
    region: '서울 강서구',
    participant_limit: 20,
    open_chat_link: '',
    description: '보름동안 시집 한 권 읽기!',
    group_lead: '1',
    userGroup: [
      {
        userId: '1',
        nickname: '탱크보이',
        profileImg: 'https://via.placeholder.com/40',
        userInfo: 'user_info',
        gender: 'female',
        age: '23',
        provider: 'kakao',
        groups: [2, 3, 4],
      },
    ],
  },
];

const BestRecruitList = () => {
  const checkGroupLead = (userGroup: UserGroup[], groupLeaderId: string) => {
    return userGroup.filter((user) => user.userId === groupLeaderId);
  };

  return (
    <section className='bg-white border border-solid border-[#DFDFDF] rounded-md mx-5 mt-14'>
      <h2 className=' mx-5 my-7 text-lg font-bold'>인기 모임</h2>
      <ul>
        {BESTRECRUITDUMMY.map((group, i) => (
          <BestRecruitListItem
            key={group.group_id}
            {...group}
            index={i}
            groupLeader={checkGroupLead(group.userGroup, group.group_lead)[0]}
          />
        ))}
      </ul>
    </section>
  );
};

export default BestRecruitList;
