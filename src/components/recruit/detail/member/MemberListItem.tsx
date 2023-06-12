import Link from 'next/link';
import React from 'react';

import Avatar from '@/components/common/Avartar';

interface MemberListProps {
  userId: number;
  profileImg: string;
  nickname: string;
  userInfo: string;
}

const MemberListItem = ({
  profileImg,
  nickname,
  userInfo,
  userId,
}: MemberListProps) => {
  return (
    <li>
      <Link href={`/profile?userId=${userId}`} className='flex pb-4'>
        <Avatar
          src={profileImg}
          shape='circle'
          placeholder=''
          lazy={false}
          alt='멤버 프로필 이미지'
          width='w-[50px]'
          height='h-[50px]'
        />
        <div className='pl-3'>
          <h3 className='text-sm font-bold'>{nickname}</h3>
          <p className='text-[#999797]'>{userInfo}</p>
        </div>
      </Link>
    </li>
  );
};

export default MemberListItem;
