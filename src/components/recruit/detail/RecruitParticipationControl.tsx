import React from 'react';

interface RecruitManagementProps {
  isMember: boolean;
  recruitmentStatus: boolean;
}

const RecruitUserManagement = ({
  isMember,
  recruitmentStatus,
}: RecruitManagementProps) => {
  /**모임 가입/탈퇴 api 통신 추가 예정 */

  return (
    <div className=' w-full h-20 max-w-xl bg-white flex justify-center items-center fixed bottom-0 border-t border-[#EBEAEA]'>
      <button
        className='w-[90%] h-12 bg-[#67A68A] rounded-md text-white text-base font-bold disabled:bg-zinc-300'
        disabled={!recruitmentStatus}
      >
        {isMember ? '탈퇴하기' : '참여하기'}
      </button>
    </div>
  );
};

export default RecruitUserManagement;
