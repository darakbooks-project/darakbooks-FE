import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import { fetchReadingGroupInfo } from '@/api/recruit';
import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import Header from '@/components/common/Header';
import MemberListItem from '@/components/recruit/detail/member/MemberListItem';

const RecruitMemberPage = () => {
  const {
    query: { groupId },
  } = useRouter();

  const {
    data: groupData,
    isError: isGroupError,
    isLoading: isGroupLoading,
  } = useQuery(
    ['recruitDetail', groupId],
    () => fetchReadingGroupInfo(groupId as string),
    {
      staleTime: 1000 * 60 * 10,
    },
  );

  if (isGroupError) return <></>;
  if (isGroupLoading) return <></>;

  const { is_group_lead, group_lead, userGroup } = groupData;

  return (
    <AuthRequiredPage>
      <div className='h-full bg-white'>
        <div className='pb-5 pt-14'>
          <Header title='참여인원' />
        </div>
        <div className=' border border-[#EBEAEA]' />
        <section className='px-5 '>
          <p className='py-4 text-sm text-main'>멤버 {userGroup.length}</p>
          <ul>
            {userGroup.map((user) => (
              <MemberListItem
                key={user.userId}
                {...user}
                groupId={groupId as string}
                groupLeader={is_group_lead}
                groupLeaderId={group_lead}
              />
            ))}
          </ul>
        </section>
      </div>
    </AuthRequiredPage>
  );
};

export default RecruitMemberPage;
