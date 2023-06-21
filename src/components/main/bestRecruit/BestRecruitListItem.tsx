import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { fetchReadingGroupLeader } from '@/api/main';
import Avatar from '@/components/common/Avartar';
import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';
import { BestGroupListType, UserGroup } from '@/types/recruit';

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
  const router = useRouter();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);

  const moveGroupDetail = (group_group_id: number) => {
    if (!isAuthorized) return openAuthRequiredModal();

    router.push({
      pathname: 'recruit/detail',
      query: {
        groupId: group_group_id,
      },
    });
  };

  const {
    data: groupLeader,
    isLoading,
    isError,
  } = useQuery<UserGroup>(
    ['bestGroupLeader'],
    () => fetchReadingGroupLeader(group_group_id),
    {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
    },
  );

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <li onClick={() => moveGroupDetail(group_group_id)}>
      <div className='flex items-center mx-5 mb-7'>
        <div className='mr-3 text-lg font-bold text-main'>{index + 1}</div>
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
      </div>
    </li>
  );
};

export default BestRecruitListItem;
