import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { fetchReadingGroupLeader } from '@/api/main';
import { fetchReadingGroupInfo } from '@/api/recruit';
import Avatar from '@/components/common/Avartar';
import RecruitNotification from '@/components/recruit/detail/RecruitNotification';
import RecruitParticipationControl from '@/components/recruit/detail/RecruitParticipationControl';
import { GroupLeaderType, GroupList } from '@/types/recruit';

interface ReadingGroupType {
  group: GroupList;
  is_group_lead: boolean;
  is_participant: boolean;
}

const RecruitDetailPage = () => {
  const {
    query: { groupId },
  } = useRouter();

  const {
    data: groupData,
    isError: isGroupError,
    isLoading: isGroupLoading,
  } = useQuery<ReadingGroupType>(['recruitDetail'], () =>
    fetchReadingGroupInfo(groupId as string),
  );

  const {
    data: groupLeader,
    isLoading: isLeaderLoading,
    isError: isLeaderError,
  } = useQuery<GroupLeaderType>(
    ['recruitLeader'],
    () => fetchReadingGroupLeader(groupId as string),
    {
      enabled: !!groupData,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
    },
  );
  if (isGroupLoading || isLeaderLoading) return <></>;
  if (isGroupError || isLeaderError) return <></>;

  const {
    day,
    time,
    region,
    userGroup,
    participant_limit,
    open_chat_link,
    recruitment_status,
    name,
    description,
    meeting_type,
    group_id,
  } = groupData.group;

  const NotificationState = [
    { title: '요일/시간', detail: `매주 ${day} ${time}` },
    { title: '활동 장소', detail: `매주 ${region}` },
    {
      title: '참여 인원',
      detail: `${userGroup.length}/${participant_limit}`,
    },
    { title: '소통 방법', detail: `${open_chat_link}` },
  ];

  return (
    <div className='h-full bg-white'>
      <div className='w-full h-[17.5rem] bg-[#FFFCEA]' />
      <main className='flex flex-col bg-white relative -top-10 px-5 rounded-t-[1.875rem] pb-20'>
        <div className='flex py-6'>
          <Avatar
            src={groupLeader.photoUrl}
            shape='circle'
            placeholder=''
            lazy={false}
            alt='모임장 프로필 이미지'
            width='w-[3.375rem]'
            height='h-[3.375rem]'
          />
          <div className='pl-4'>
            <h3 className='text-sm text-[#67A68A]'>
              {recruitment_status ? '모집중' : '모집완료'}
            </h3>
            <h1 className='text-xl font-bold'>{name}</h1>
          </div>
        </div>
        <p>{description}</p>
        <div className='w-full h-[1px] bg-[#EBEAEA] my-8' />
        <h3 className='text-[#67A68A] text-sm'>자세한 정보 알려드려요</h3>
        <h2 className='text-xl pt-1 font-bold pb-6'>안내사항</h2>
        {NotificationState.map(({ title, detail }) => (
          <RecruitNotification
            key={title}
            title={title}
            detail={detail}
            meetingType={meeting_type === 'online'}
            isMember={groupData.is_participant}
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
          {userGroup.map((member) => (
            <div key={member.userId} className='pr-2'>
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
      {!groupData.is_group_lead && (
        <RecruitParticipationControl
          groupId={group_id}
          isMember={groupData.is_participant}
          recruitmentStatus={recruitment_status}
        />
      )}
    </div>
  );
};

export default RecruitDetailPage;

export const getServerSideProps: GetServerSideProps = ({
  query: { groupId },
}) => {
  return Promise.resolve({
    props: {
      groupId: groupId as string,
    },
  });
};
