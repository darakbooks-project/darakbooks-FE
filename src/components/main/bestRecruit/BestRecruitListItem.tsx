import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { fetchBestGroupLeader } from '@/api/main';
import Avatar from '@/components/common/Avartar';
import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';
import { BestGroupListType, GroupLeaderType } from '@/types/recruit';

interface BestRecruitListItemProps
  extends Pick<
    BestGroupListType,
    'group_group_id' | 'group_name' | 'group_description'
  > {
  index: number;
}

const BestRecruitListItem = ({
  group_group_id,
  group_name,
  group_description,
  index,
}: BestRecruitListItemProps) => {
  const { openAuthRequiredModal } = useAuth();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);

  const renderLoginModal = () => {
    if (!isAuthorized) openAuthRequiredModal();
  };

  const {
    data: groupLeader,
    isLoading,
    isError,
  } = useQuery<GroupLeaderType>(
    ['bestGroupLeader'],
    () => fetchBestGroupLeader(group_group_id),
    {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
    },
  );

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <li onClick={renderLoginModal}>
      <Link
        href={isAuthorized ? `recruit/detail?groupId=${group_group_id}` : ''}
        className='flex items-center mx-5 mb-7'
      >
        <div className='text-lg font-bold mr-3 text-[#67A68A]'>{index + 1}</div>
        <div className='mr-3'>
          <Avatar
            src={groupLeader.photoUrl}
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
            {group_name}
          </h3>
          <p className='text-sm text-[#707070] truncate w-[60vw] max-w-sm xxs:w-[50vw]'>
            {group_description}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default BestRecruitListItem;