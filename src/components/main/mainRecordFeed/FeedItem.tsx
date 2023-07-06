import ColorThief from 'colorthief';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useAuth } from '@/hooks/useAuth';
import useRememberScroll from '@/hooks/useRememberScroll';
import { isAuthorizedSelector } from '@/recoil/auth';
import { RecordType } from '@/types/record';

const FeedItem = ({ text, book, user, recordId }: RecordType) => {
  const { title, thumbnail } = book;
  const { nickname } = user;
  const [bookCoverBgColor, setBookCoverBgColor] = useState('');
  const router = useRouter();

  const { openAuthRequiredModal } = useAuth();
  const { setScroll } = useRememberScroll('mainFeed');

  const isAuthorized = useRecoilValue(isAuthorizedSelector);

  const handleMoveRecordFeed = () => {
    if (!isAuthorized) {
      openAuthRequiredModal();
      return;
    }
    setScroll();
    router.push({
      pathname: 'book/feed',
      query: {
        recordId,
        type: 'MAIN',
      },
    });
  };

  const handleGetImgColor = (image: HTMLImageElement) => {
    const colorThief = new ColorThief();
    const colorHex = colorThief
      .getColor(image)
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
    setBookCoverBgColor(`#${colorHex}`);
  };

  return (
    <li
      onClick={handleMoveRecordFeed}
      className='w-full h-[108px] flex justify-between border border-solid border-[#DFDFDF] rounded-md mb-4 px-6 overflow-hidden '
      style={{
        backgroundColor: `${bookCoverBgColor}20`,
      }}
    >
      <div className='py-4 '>
        <h3 className='h-6 text-clampBase font-bold truncate max-w-[50vw]'>
          #{title}
        </h3>
        <p className='text-xs pb-3 pt-2 truncate w-[45vw] max-w-sm'>{text}</p>
        <p className='text-xs text-[#707070] truncate w-[45vw]'>@{nickname}</p>
      </div>
      <div className='flex-none mt-4 xxs:mt-5'>
        <Image
          src={thumbnail}
          width={80}
          height={110}
          alt='책 표지'
          className='w-[5rem] h-[6.875rem] xxs:w-[3.75rem] xxs:h-[5.625rem]'
          crossOrigin='anonymous'
          onLoadingComplete={handleGetImgColor}
        />
      </div>
    </li>
  );
};

export default FeedItem;
