import { QueryClient, useMutation } from '@tanstack/react-query';
import React from 'react';

import { postGroupJoinUser, postGroupLeaveUser } from '@/api/recruit';

interface RecruitManagementProps {
  groupId: number;
  isMember: boolean;
  recruitmentStatus: boolean;
}

const RecruitUserManagement = ({
  groupId,
  isMember,
  recruitmentStatus,
}: RecruitManagementProps) => {
  const queryClient = new QueryClient();
  const { mutate: joinGroupUser } = useMutation(postGroupJoinUser, {
    onSuccess: () => {
      alert('모임에 참여하게 되었어요!');
      queryClient.invalidateQueries(['recruitDetail']);
    },
  });
  const { mutate: leaveGroupUser } = useMutation(postGroupLeaveUser, {
    onSuccess: () => {
      alert('모임에서 탈퇴하였습니다.');
      queryClient.invalidateQueries(['recruitDetail']);
    },
  });

  const handleCheckJoinStatus = (isMember: boolean, groupId: number) => {
    isMember ? leaveGroupUser(groupId) : joinGroupUser(groupId);
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
        className='w-[90%] h-12 bg-[#67A68A] rounded-md text-white text-base font-bold disabled:bg-zinc-300'
        disabled={!recruitmentStatus}
        onClick={() => handleCheckJoinStatus(isMember, groupId)}
      >
        {handleCheckUserType(recruitmentStatus, isMember)}
      </button>
    </div>
  );
};

export default RecruitUserManagement;
