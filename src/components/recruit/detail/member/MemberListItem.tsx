import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { deleteGroupMember } from '@/api/recruit';
import Modal from '@/components/common/Modal';
import { modalStateAtom } from '@/recoil/modal';
import { UserGroup } from '@/types/recruit';

interface MemberListProps
  extends Pick<UserGroup, 'photoUrl' | 'nickname' | 'userInfo' | 'userId'> {
  groupId: string;
  groupLeader: boolean;
  groupLeaderId: string;
}

const MemberListItem = ({
  photoUrl,
  nickname,
  userInfo,
  userId,
  groupId,
  groupLeader,
  groupLeaderId,
}: MemberListProps) => {
  const checkGroupReader = groupLeaderId === userId;
  const [modal, setModal] = useRecoilState(modalStateAtom);
  const { mutate: kickOutMember } = useMutation(deleteGroupMember);
  const [isClickedUser, setIsClickedUser] = useState(false);
  const queryClient = useQueryClient();

  const handleKickOutMember = (groupId: string, userId: string) => {
    kickOutMember(
      { groupId, userId },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(['recruitDetail']);
          setModal({ type: 'HIDDEN' });
        },
      },
    );
  };

  useEffect(() => {
    if (modal.type === 'HIDDEN') setIsClickedUser(false);
  }, [modal]);

  const groupKickOutModal = (
    <div className='flex flex-col items-center justify-center'>
      <Image
        src='/images/group/kick-out.svg'
        alt='강퇴'
        width={54}
        height={54}
      />
      <h3 className='font-bold text-clampLg'>정말 강퇴하시겠어요?</h3>
      <p className='pb-7 text-clampSm'>{nickname}님을 강퇴하시겠어요?</p>
      <div className='flex w-full'>
        <button
          onClick={() => setModal({ type: 'HIDDEN' })}
          className='w-3/4 h-12 bg-[#F3F3F3] rounded-lg mr-3 text-textBlack text-clampSm'
        >
          취소
        </button>
        <button
          onClick={() => handleKickOutMember(groupId, userId)}
          className='w-3/4 h-12 bg-[#F05050] rounded-lg text-white text-clampSm'
        >
          강퇴
        </button>
      </div>
    </div>
  );

  return (
    <li className='flex items-center justify-between'>
      <Link
        href={{
          pathname: '/profile',
          query: {
            ownerId: userId,
          },
        }}
        className='flex pb-4'
      >
        <div className='relative flex-shrink-0'>
          <Image
            src={photoUrl}
            alt='멤버 프로필 이미지'
            width={50}
            height={50}
            sizes='100vw'
            className='rounded-full w-[3.1875rem] h-[3.1875rem]'
          />
          {checkGroupReader && (
            <Image
              src='/images/group/group-leader.svg'
              width={22}
              height={22}
              alt='모임장 아이콘'
              className='absolute bottom-0 -right-1'
            />
          )}
        </div>
        <div className='flex flex-col justify-center pl-3'>
          <h3 className='text-clampSm font-bold xxs:truncate xxs:w-[40vw]'>
            {nickname}
          </h3>
          <p className='text-[#999797] text-clampSm xxs:truncate xxs:w-[45vw]'>
            {userInfo}
          </p>
        </div>
      </Link>
      {groupLeader && !checkGroupReader && (
        <button
          onClick={() => {
            setIsClickedUser(true);
            setModal({ type: 'KICKOUT' });
          }}
          className='w-14 h-8 border border-[#EBEAEA] rounded-md text-xs font-semibold text-[0.75rem]'
        >
          강퇴
        </button>
      )}
      {modal.type === 'KICKOUT' && isClickedUser && (
        <Modal>{groupKickOutModal}</Modal>
      )}
    </li>
  );
};

export default MemberListItem;
