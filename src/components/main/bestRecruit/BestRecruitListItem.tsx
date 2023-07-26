import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { fetchReadingGroupLeader } from '@/api/main';
import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';
import { BestGroupListType } from '@/types/recruit';

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
  } = useQuery(
    ['recruitLeader', group_group_id],
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
        <div className='mr-3 text-lg font-bold text-main font-lato'>
          {index + 1}
        </div>
        <Image
          src={groupLeader.photoUrl}
          alt='모임장 프로필 이미지'
          width='45'
          height='45'
          sizes='100vw'
          className='object-cover rounded-full w-[2.8125rem] h-[2.8125rem]'
        />
        <div className='flex-col justify-between ml-3'>
          <h3 className='text-clampBase font-medium truncate w-[60vw] max-w-sm xxs:w-[45vw]'>
            {group_name}
          </h3>
          <p className='text-xs text-[#707070] truncate w-[60vw] max-w-sm xxs:w-[45vw]'>
            {group_description}
          </p>
        </div>
      </div>
    </li>
  );
};

export default BestRecruitListItem;
