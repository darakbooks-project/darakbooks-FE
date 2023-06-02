import React from 'react';

import BestRecruitListItem from './BestRecruitListItem';

const BESTRECRUITDUMMY = [
  {
    groupId: 1,
    groupName: '도서관을 사랑하는 독서 모임',
    recruitment: true,
    description: '온라인 모임 함께하실 분~~',
  },
  {
    groupId: 2,
    groupName: '낭독합시다',
    recruitment: true,
    description: '함께해요!',
  },
  {
    groupId: 3,
    groupName: '시 좋아하세요?',
    recruitment: false,
    description: '보름동안 시집 한 권 읽기!',
  },
];

const BestRecruitList = () => {
  return (
    <section className='bg-white border border-solid border-[#DFDFDF] rounded-md mx-5 mt-14'>
      <h2 className=' mx-5 my-7 text-lg font-bold'>인기 모임</h2>
      <ul>
        {BESTRECRUITDUMMY.map((group) => (
          <BestRecruitListItem key={group.groupId} {...group} />
        ))}
      </ul>
    </section>
  );
};

export default BestRecruitList;
