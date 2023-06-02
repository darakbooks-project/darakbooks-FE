import Link from 'next/link';
import React from 'react';

interface BestRecruitListItemProps {
  groupId: number;
  groupName: string;
  description: string;
  recruitment: boolean;
}

const BestRecruitListItem = ({
  groupId,
  groupName,
  description,
  recruitment,
}: BestRecruitListItemProps) => {
  return (
    <li>
      <Link
        href={`recruit/detail?groupId=${groupId}`}
        className='flex justify-between items-center mx-5 mb-7'
      >
        <div className='flex-col justify-between'>
          <h3 className='text-base font-bold text-[#707070] truncate w-[55vw] max-w-sm'>
            {groupName}
          </h3>
          <p className='text-sm text-[#707070] truncate w-[55vw] max-w-sm'>
            {description}
          </p>
        </div>
        <div className='bg-[#67A68A] text-white text-xs flex items-center justify-center rounded p-1'>
          {recruitment ? '모집중' : '모집완료'}
        </div>
      </Link>
    </li>
  );
};

export default BestRecruitListItem;
