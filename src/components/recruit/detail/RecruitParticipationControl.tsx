import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { useRecoilState } from 'recoil';

import { postGroupJoinUser, postGroupLeaveUser } from '@/api/recruit';
import Modal from '@/components/common/Modal';
import { modalStateAtom } from '@/recoil/modal';

interface RecruitManagementProps {
  groupId: number;
  groupName: string;
  isMember: boolean;
  recruitmentStatus: boolean;
  participantLimit: boolean;
}

const RecruitUserManagement = ({
  groupId,
  groupName,
  isMember,
  recruitmentStatus,
  participantLimit,
}: RecruitManagementProps) => {
  const [modal, setModal] = useRecoilState(modalStateAtom);
  const queryClient = useQueryClient();
  const { mutate: joinGroupUser, isLoading: isJoinLoading } = useMutation(
    postGroupJoinUser,
    {
      onSuccess: () => {
        setModal({ type: 'HIDDEN' });
        queryClient.invalidateQueries(['recruitDetail']);
      },
    },
  );
  const { mutate: leaveGroupUser, isLoading: isLeaveLoading } = useMutation(
    postGroupLeaveUser,
    {
      onSuccess: () => {
        setModal({ type: 'HIDDEN' });
        queryClient.invalidateQueries(['recruitDetail']);
      },
    },
  );

  const groupJoinModal = (
    <div className='flex flex-col items-center justify-center'>
      <Image src='/images/group/join.svg' alt='참여' width={54} height={54} />
      <h3 className='text-xl font-bold'>{groupName}</h3>
      <p className='pb-7'>모임에 참여하시겠어요?</p>
      <div>
        <button
          onClick={() => setModal({ type: 'HIDDEN' })}
          disabled={isJoinLoading}
          className='w-36 h-12 bg-[#F3F3F3] rounded-lg mr-3 text-[#333333]'
        >
          취소
        </button>
        <button
          onClick={() => joinGroupUser(groupId)}
          disabled={isJoinLoading}
          className='h-12 text-white rounded-lg w-36 bg-main disabled:bg-zinc-300'
        >
          {isJoinLoading ? '로딩중' : '참여'}
        </button>
      </div>
    </div>
  );

  const groupLeaveModal = (
    <div className='flex flex-col items-center justify-center'>
      <Image src='/images/group/leave.svg' alt='탈퇴' width={54} height={54} />
      <h3 className='text-xl font-bold'>정말 탈퇴하시겠어요?</h3>
      <p className='pb-7'>더 이상 모임에 참여할 수 없어요</p>
      <div>
        <button
          onClick={() => setModal({ type: 'HIDDEN' })}
          disabled={isLeaveLoading}
          className='w-36 h-12 bg-[#F3F3F3] rounded-lg mr-3 text-[#333333]'
        >
          취소
        </button>
        <button
          onClick={() => leaveGroupUser(groupId)}
          disabled={isLeaveLoading}
          className='w-36 h-12 bg-[#F05050] rounded-lg text-white disabled:bg-zinc-300'
        >
          {isLeaveLoading ? '로딩중' : '탈퇴'}
        </button>
      </div>
    </div>
  );
  const handleCheckJoinStatus = (isMember: boolean) => {
    setModal({ type: isMember ? 'GROUPLEAVE' : 'GROUPJOIN' });
  };

  const handleCheckUserType = (
    recruitmentStatus: boolean,
    isMember: boolean,
    participantLimit: boolean,
  ) => {
    if (participantLimit && !isMember) return '모임이 꽉 찼어요';
    if (!recruitmentStatus) return '모집이 끝났어요';
    return isMember ? '탈퇴하기' : '참여하기';
  };

  return (
    <div className=' w-full h-20 max-w-xl bg-white flex justify-center items-center fixed bottom-0 border-t border-[#EBEAEA]'>
      <button
        className='w-[90%] h-12 bg-main rounded-md text-white text-base font-bold disabled:bg-zinc-300'
        disabled={!recruitmentStatus || (participantLimit && !isMember)}
        onClick={() => handleCheckJoinStatus(isMember)}
      >
        {handleCheckUserType(recruitmentStatus, isMember, participantLimit)}
      </button>
      {modal.type === 'GROUPLEAVE' && isMember && (
        <Modal>{groupLeaveModal}</Modal>
      )}
      {modal.type === 'GROUPJOIN' && !isMember && (
        <Modal>{groupJoinModal}</Modal>
      )}
    </div>
  );
};

export default RecruitUserManagement;
