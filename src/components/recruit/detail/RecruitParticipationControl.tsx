import { useMutation, useQueryClient } from '@tanstack/react-query';
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
}

const RecruitUserManagement = ({
  groupId,
  groupName,
  isMember,
  recruitmentStatus,
}: RecruitManagementProps) => {
  const [modal, setModal] = useRecoilState(modalStateAtom);
  const queryClient = useQueryClient();
  const { mutate: joinGroupUser } = useMutation(postGroupJoinUser, {
    onSuccess: () => {
      setModal({ type: 'HIDDEN' });
      queryClient.invalidateQueries(['recruitDetail']);
    },
  });
  const { mutate: leaveGroupUser } = useMutation(postGroupLeaveUser, {
    onSuccess: () => {
      setModal({ type: 'HIDDEN' });
      queryClient.invalidateQueries(['recruitDetail']);
    },
  });

  const groupJoinModal = (
    <div className='flex flex-col items-center justify-center'>
      <h3 className='font-bold text-xl'>{groupName}</h3>
      <p className='pb-7'>모임에 참여하시겠어요?</p>
      <div>
        <button
          onClick={() => setModal({ type: 'HIDDEN' })}
          className='w-36 h-12 bg-[#F3F3F3] rounded-lg mr-3 text-[#333333]'
        >
          취소
        </button>
        <button
          onClick={() => joinGroupUser(groupId)}
          className='w-36 h-12 bg-main rounded-lg text-white'
        >
          참여
        </button>
      </div>
    </div>
  );

  const groupLeaveModal = (
    <div className='flex flex-col items-center justify-center'>
      <h3 className='font-bold text-xl'>정말 탈퇴하시겠어요?</h3>
      <p className='pb-7'>더 이상 모임에 참여할 수 없어요</p>
      <div>
        <button
          onClick={() => setModal({ type: 'HIDDEN' })}
          className='w-36 h-12 bg-[#F3F3F3] rounded-lg mr-3 text-[#333333]'
        >
          취소
        </button>
        <button
          onClick={() => leaveGroupUser(groupId)}
          className='w-36 h-12 bg-[#F05050] rounded-lg text-white'
        >
          탈퇴
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
  ) => {
    if (!recruitmentStatus) return '모집이 끝났어요';
    return isMember ? '탈퇴하기' : '참여하기';
  };

  return (
    <div className=' w-full h-20 max-w-xl bg-white flex justify-center items-center fixed bottom-0 border-t border-[#EBEAEA]'>
      <button
        className='w-[90%] h-12 bg-main rounded-md text-white text-base font-bold disabled:bg-zinc-300'
        disabled={!recruitmentStatus}
        onClick={() => handleCheckJoinStatus(isMember)}
      >
        {handleCheckUserType(recruitmentStatus, isMember)}
      </button>
      {!(modal.type === 'HIDDEN') && (
        <Modal>{isMember ? groupLeaveModal : groupJoinModal}</Modal>
      )}
    </div>
  );
};

export default RecruitUserManagement;
