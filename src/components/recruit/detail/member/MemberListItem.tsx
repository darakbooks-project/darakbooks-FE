import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRecoilState } from 'recoil';

import { deleteGroupMember } from '@/api/recruit';
import Modal from '@/components/common/Modal';
import { modalStateAtom } from '@/recoil/modal';
import { UserGroup } from '@/types/recruit';

type MemberListProps = Pick<
  UserGroup,
  'photoUrl' | 'nickname' | 'userInfo' | 'userId'
> & {
  groupId: string;
  groupLeader: boolean;
  groupLeaderId: string;
};

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

  const groupKickOutModal = (
    <div className='flex flex-col items-center justify-center'>
      <h3 className='text-xl font-bold'>정말 강퇴하시겠어요?</h3>
      <p className='pb-7'>{nickname}님을 강퇴하시겠어요?</p>
      <div>
        <button
          onClick={() => setModal({ type: 'HIDDEN' })}
          className='w-36 h-12 bg-[#F3F3F3] rounded-lg mr-3 text-[#333333]'
        >
          취소
        </button>
        <button
          onClick={() => handleKickOutMember(groupId, userId)}
          className='w-36 h-12 bg-[#F05050] rounded-lg text-white'
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
        <div className='relative'>
          <Image
            src={photoUrl}
            alt='멤버 프로필 이미지'
            width={50}
            height={50}
            sizes='100vw'
            className='rounded-full'
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
          <h3 className='text-sm font-bold'>{nickname}</h3>
          <p className='text-[#999797]'>{userInfo}</p>
        </div>
      </Link>
      {groupLeader && !checkGroupReader && (
        <button
          onClick={() => setModal({ type: 'KICKOUT' })}
          className='w-14 h-8 border border-[#EBEAEA] rounded-md text-xs font-semibold'
        >
          강퇴
        </button>
      )}
      {modal.type === 'KICKOUT' && <Modal>{groupKickOutModal}</Modal>}
    </li>
  );
};

export default MemberListItem;
