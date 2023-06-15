import React from 'react';

import { BestGroupListType } from '@/types/recruit';

import BestRecruitListItem from './BestRecruitListItem';

const BestRecruitList = ({
  BestGroupList,
}: {
  BestGroupList: BestGroupListType[];
}) => {
  return (
    <section className='bg-white border border-solid border-[#DFDFDF] rounded-md mx-5 mt-14'>
      <h2 className=' mx-5 my-7 text-lg font-bold'>인기 모임</h2>
      <ul>
        {BestGroupList.map((group, i) => (
          <BestRecruitListItem
            key={group.group_group_id}
            {...group}
            index={i}
          />
        ))}
      </ul>
    </section>
  );
};

export default BestRecruitList;
