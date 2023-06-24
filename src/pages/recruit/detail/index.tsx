import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilState } from 'recoil';

import { fetchReadingGroupLeader } from '@/api/main';
import { fetchReadingGroupInfo } from '@/api/recruit';
import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import Avatar from '@/components/common/Avartar';
import Header from '@/components/common/Header';
import RecruitNotification from '@/components/recruit/detail/RecruitNotification';
import RecruitParticipationControl from '@/components/recruit/detail/RecruitParticipationControl';
import RecruitStatusSelectModal from '@/components/recruit/detail/RecruitStatusSelectModal';
import { selectRecruitStatusAtom } from '@/recoil/modal';

const RecruitDetailPage = () => {
  const {
    query: { groupId },
    push,
  } = useRouter();
  const [modal, setModal] = useRecoilState(selectRecruitStatusAtom);

  const {
    data: groupData,
    isError: isGroupError,
    isLoading: isGroupLoading,
  } = useQuery(
    ['recruitDetail', groupId],
    () => fetchReadingGroupInfo(groupId as string),
    {
      staleTime: 1000 * 60,
    },
  );

  const {
    data: groupLeader,
    isLoading: isLeaderLoading,
    isError: isLeaderError,
  } = useQuery(
    ['recruitLeader', groupId],
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
    is_group_lead,
    is_participant,
  } = groupData;

  const NotificationState = [
    { title: '요일/시간', detail: `매주 ${day} ${time}` },
    { title: '활동 장소', detail: `${region}` },
    {
      title: '참여 인원',
      detail: `${userGroup.length}/${participant_limit}`,
    },
    { title: '소통 방법', detail: `${open_chat_link}` },
  ];

  const moreMenu = (
    <Link
      href={{ pathname: '/recruit/update', query: { groupId } }}
      className='flex justify-end'
    >
      <Image
        src={'/images/group/edit-pencil.svg'}
        width={20}
        height={20}
        alt='수정하기 아이콘'
      />
    </Link>
  );

  return (
    <AuthRequiredPage>
      <div className='h-full bg-white'>
        <Header
          moreMenu={is_group_lead && moreMenu}
          className='absolute mt-14'
          pathname='/recruit'
        />
        <div className='w-full h-[350px] bg-[#FFFCEA]' />
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
              onAvatarClick={() =>
                push({
                  pathname: '/profile',
                  query: {
                    ownerId: groupLeader.userId,
                  },
                })
              }
            />
            <div className='pl-4'>
              <h3 className='text-sm text-main'>
                {recruitment_status ? '모집중' : '모집완료'}
              </h3>
              <h1 className='text-xl font-bold'>{name}</h1>
            </div>
          </div>
          {is_group_lead && (
            <button
              onClick={() => setModal(true)}
              className='w-[5.625rem] h-[2.1875rem] border border-solid border-[#DFDFDF] rounded mb-5 flex justify-around items-center'
            >
              {recruitment_status ? '모집중' : '모집완료'}
              <Image
                src='/images/group/spread.svg'
                width={20}
                height={20}
                alt='모집여부 변경 아이콘'
              />
            </button>
          )}
          {modal && (
            <RecruitStatusSelectModal
              groupId={group_id}
              recruitmentStatus={recruitment_status}
            />
          )}
          <p>{description}</p>
          <div className='w-full h-[1px] bg-[#EBEAEA] my-8' />
          <h3 className='text-sm text-main'>자세한 정보 알려드려요</h3>
          <h2 className='pt-1 pb-6 text-xl font-bold'>안내사항</h2>
          {NotificationState.map(({ title, detail }) => (
            <RecruitNotification
              key={title}
              title={title}
              detail={detail}
              meetingType={meeting_type === 'online'}
              isMember={is_participant}
            />
          ))}
          <div className='w-full h-[1px] bg-[#EBEAEA] my-8' />
          <h3 className='text-sm text-main'>함께 독서하며 소통하고 있어요</h3>
          <div className='flex items-center justify-between pb-5'>
            <h2 className='pt-1 text-xl font-bold'>멤버 소개</h2>
            <Link
              href={{
                pathname: `/recruit/detail/member`,
                query: { groupId },
              }}
            >
              전체보기
            </Link>
          </div>
          <div className='flex'>
            {userGroup.map(({ userId, photoUrl }) => (
              <div key={userId} className='pr-2'>
                <Avatar
                  src={photoUrl}
                  shape='circle'
                  alt='구성원 프로필 이미지'
                  lazy={false}
                  placeholder=''
                  width='w-[3.1875rem]'
                  height='h-[3.1875rem]'
                  onAvatarClick={() =>
                    push({
                      pathname: '/profile',
                      query: {
                        ownerId: userId,
                      },
                    })
                  }
                />
              </div>
            ))}
          </div>
        </main>
        {!is_group_lead && (
          <RecruitParticipationControl
            groupId={group_id}
            groupName={name}
            isMember={groupData.is_participant}
            recruitmentStatus={recruitment_status}
            participantLimit={participant_limit === userGroup.length}
          />
        )}
      </div>
    </AuthRequiredPage>
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
