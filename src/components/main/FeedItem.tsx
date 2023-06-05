import { useColor } from 'color-thief-react';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface FeedItemProps {
  image: string;
  title: string;
  recode: string;
  nickname: string;
  memberId: number;
  localImg: StaticImageData;
}

const FeedItem = ({
  image,
  title,
  recode,
  nickname,
  memberId,
  localImg,
}: FeedItemProps) => {
  const { data: colors } = useColor(image, 'hex', {
    crossOrigin: 'anonymous',
  });
  if (!colors) return null;
  return (
    <div
      className='w-full h-[108px] flex justify-between border border-solid border-[#DFDFDF] rounded-md mb-4 px-6 overflow-hidden'
      style={{ backgroundColor: `${colors}20` }}
    >
      <div className=' py-4'>
        <h1 className='text-base font-bold h-4'>#{title}</h1>
        <p className='text-xs pb-3 pt-2 truncate w-[50vw] max-w-sm'>{recode}</p>
        <p className='text-xs text-[#707070]'>@{nickname}</p>
      </div>
      <div className='mt-4'>
        <Image
          src={localImg}
          width={80}
          height={110}
          alt='책 표지'
          className='w-[80px] h-[110px]'
        />
      </div>
    </div>
  );
};

export default FeedItem;
