import React from 'react';

interface RecruitNotificationProps {
  title: string;
  detail: string;
  meetingType: boolean;
  isMember: boolean;
}

const RecruitNotification = ({
  title,
  detail,
  meetingType,
  isMember,
}: RecruitNotificationProps) => {
  const displayDetail = (title: string, isMember: boolean) => {
    switch (title) {
      case '활동 장소':
        return meetingType ? detail : '온라인';
      case '소통 방법':
        return isMember ? (
          <a
            href={detail}
            target='_blank'
            rel='noreferrer'
            className='text-[#4F94FB]'
          >
            {detail}
          </a>
        ) : (
          '모임 멤버만 볼 수 있어요!'
        );
      default:
        return detail;
    }
  };

  return (
    <div className='flex items-center pb-3'>
      <div className='w-6 h-6 bg-slate-300'></div> {/**아이콘 */}
      <p className='px-3 text-sm text-[#707070]'>{title}</p>
      <p className='text-sm font-bold'>{displayDetail(title, isMember)}</p>
    </div>
  );
};

export default RecruitNotification;
