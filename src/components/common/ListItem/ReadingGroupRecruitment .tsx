import Image from 'next/image';
import { useState } from 'react';

import BookImage from '../BookImage';

interface GruopProps {
  name: string;
  deadline: string;
  type: '온라인' | '오프라인';
  day: '월' | '화' | '수' | '목' | '금' | '토' | '일';
  region: string;
  isRecruitment: boolean;
  recruitmentNumber: number;
}

interface ReadingGroupRecruitmentProps {
  src: string;
  group: GruopProps;
  onClickDeleteButton(): void;
}

const ReadingGroupRecruitment = ({
  src,
  group,
  onClickDeleteButton,
}: ReadingGroupRecruitmentProps) => {
  const [isSettingButtonOpen, setIsSettingButtonOpen] = useState(false);

  const clickSettingButton = () => {
    setIsSettingButtonOpen((prev) => !prev);
  };

  return (
    <div className='w-[100%] flex items-center bg-yellow-600 px-[20px] py-[15px] relative'>
      <BookImage
        lazy={true}
        src={src}
        placeholder='스켈레톤'
        alt='책 선택 리스트 아이템의 사진 입니다.'
        feed='not-feed-small'
      />
      <div className='font-bold text-[15px] ml-[20px]'>
        <span className='text-xl'>{group.name}</span>
        <div className='space-x-2 my-[2px]'>
          <span>{group.deadline}</span>
          <span>{group.type}</span>
          <span>{group.day}요일</span>
          <span>{group.region}</span>
        </div>
        <div className='space-x-2'>
          <span>{group.isRecruitment ? '모집 중' : '모집 완료'}</span>
          <span>{group.isRecruitment && `${group.recruitmentNumber}명`}</span>
        </div>
      </div>
      <Image
        onClick={clickSettingButton}
        className='absolute top-[5px] right-[20px] cursor-pointer'
        src='./images/setting.svg'
        width={30}
        height={30}
        alt='설정 아이콘'
      />
      <div
        className={`absolute bg-white top-[35px] right-[20px] rounded ${
          isSettingButtonOpen ? 'block' : 'hidden'
        }`}
      >
        <div className='px-[20px] py-[10px] cursor-pointer hover:bg-sky-700'>
          수정
        </div>
        <div className='px-[20px] py-[10px] cursor-pointer hover:bg-sky-700'>
          삭제
        </div>
      </div>
    </div>
  );
};

export default ReadingGroupRecruitment;
