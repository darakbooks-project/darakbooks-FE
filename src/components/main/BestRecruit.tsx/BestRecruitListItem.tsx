import Link from 'next/link';
import React from 'react';
import { useRecoilValue } from 'recoil';

import Avatar from '@/components/common/Avartar';
import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';
import { GroupList, UserGroup } from '@/types/recruit';

interface BestRecruitListItemProps extends GroupList {
  index: number;
  groupLeader: UserGroup;
}

const BestRecruitListItem = ({
  group_id,
  name,
  description,
  index,
  groupLeader,
}: BestRecruitListItemProps) => {
  const { openAuthRequiredModal } = useAuth();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);

  const renderLoginModal = () => {
    if (!isAuthorized) openAuthRequiredModal();
  };

  return (
    <li onClick={renderLoginModal}>
      <Link
        href={isAuthorized ? `recruit/detail?groupId=${group_id}` : ''}
        className='flex items-center mx-5 mb-7'
      >
        <div className='text-lg font-bold mr-3 text-[#67A68A]'>{index + 1}</div>
        <div className='mr-3'>
          <Avatar
            src={groupLeader.profileImg}
            shape='circle'
            alt='모임장 프로필 이미지'
            lazy={false}
            placeholder=''
            width='w-[45px]'
            height='h-[45px]'
          />
        </div>
        <div className='flex-col justify-between'>
          <h3 className='text-base font-bold text-[#707070] truncate w-[60vw] max-w-sm xxs:w-[50vw]'>
            {name}
          </h3>
          <p className='text-sm text-[#707070] truncate w-[60vw] max-w-sm xxs:w-[50vw]'>
            {description}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default BestRecruitListItem;
