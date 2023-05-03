import Image from 'next/image';
import { useState } from 'react';

import BookImage from '../BookImage';

const ReadingGroupRecruitment = () => {
  const [isSettingButtonOpen, setIsSettingButtonOpen] = useState(false);

  const clickSettingButton = () => {
    setIsSettingButtonOpen((prev) => !prev);
  };

  return (
    <div className='w-[100%] flex items-center bg-yellow-600 px-[20px] py-[15px] relative'>
      <BookImage
        lazy={true}
        src='https://cdn-icons-png.flaticon.com/512/1436/1436701.png'
        placeholder='스켈레톤'
        alt='책 선택 리스트 아이템의 사진 입니다.'
        feed='not-feed-small'
      />
      <div className='font-bold text-[15px] ml-[20px]'>
        <span className='text-xl'>책 모임</span>
        <div className='space-x-2 my-[2px]'>
          <span>~2023.05.03</span>
          <span>오프라인</span>
          <span>금요일</span>
          <span>울산</span>
        </div>
        <div className='space-x-2'>
          <span>모집 중</span>
          <span>2명</span>
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
