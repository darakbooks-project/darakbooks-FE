import ColorThief from 'colorthief';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';
import { RecordType } from '@/types/record';

const FeedItem = ({ text, book, user, recordId }: RecordType) => {
  const { title, thumbnail } = book;
  const { nickname } = user;
  const [bookCoverBgColor, setBookCoverBgColor] = useState('');
  const router = useRouter();

  const { openAuthRequiredModal } = useAuth();

  const isAuthorized = useRecoilValue(isAuthorizedSelector);

  const handleMoveRecrdFeed = () => {
    if (!isAuthorized) {
      openAuthRequiredModal();
      return;
    }

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
      .getPalette(image, 2)[0]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
    setBookCoverBgColor(`#${colorHex}`);
  };

  return (
    <div
      onClick={handleMoveRecrdFeed}
      className='w-full h-[108px] flex justify-between border border-solid border-[#DFDFDF] rounded-md mb-4 px-6 overflow-hidden '
      style={{
        backgroundColor: `${bookCoverBgColor}20`,
      }}
    >
      <div className='py-4 '>
        <h1 className='h-6 text-base font-bold truncate max-w-[45vw]'>
          #{title}
        </h1>
        <p className='text-xs pb-3 pt-2 truncate w-[50vw] max-w-sm'>{text}</p>
        <p className='text-xs text-[#707070]'>@{nickname}</p>
      </div>
      <div className='mt-4'>
        <Image
          src={thumbnail}
          width={80}
          height={110}
          alt='책 표지'
          className='w-[80px] h-[110px]'
          crossOrigin='anonymous'
          onLoadingComplete={handleGetImgColor}
        />
      </div>
    </div>
  );
};

export default FeedItem;
