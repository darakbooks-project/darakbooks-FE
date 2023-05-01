import 'react-datepicker/dist/react-datepicker.css';

import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import { MAX_FILE_SIZE } from '@/constants/file';

interface postImageProps {
  id: string;
  url: string;
}

const BookRecordPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [postImage, setPostImage] = useState<postImageProps>();

  const {
    query: { bid },
  } = useRouter();

  const postBookRecordImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    const formData = new FormData();
    if (!files) {
      return;
    }
    if (files[0].size > MAX_FILE_SIZE) {
      alert('업로드 가능한 최대 용량은 3MB입니다.');
      return;
    } else {
      formData.append('image', files[0]);
      {
        /*
       1. react-query mutate를 이용 post
       2. 성공 시 이미지 id와 url return 받기
       3. url로 이미지 미리보기 구현
       */
      }
      console.log(formData.get('image'));
    }
  };

  return (
    <div className='h-screen p-5 border-2 border-red-500'>
      <div className='h-1/5 border-basic flex flex-row '>
        <div className='w-1/3 border-basic'>IMAGE</div>
        <div className='flex flex-col pl-5'>
          <button className='border-basic' disabled={bid !== undefined}>
            책 선택
          </button>
          <DatePicker
            className='border-basic'
            selected={startDate}
            onChange={(date) => setStartDate(date!)}
          />
        </div>
      </div>
      <form className='h-4/5 border-basic flex flex-col items-center space-y-5'>
        {postImage ? (
          <Image
            src={postImage.url}
            alt='image_preview'
            width={150}
            height={200}
          />
        ) : (
          <>
            <label
              htmlFor='book-image'
              className='flex border-basic w-full h-1/4 mt-5 justify-center items-center'
            >
              이미지를 선택해주세요 (기본으로 책표지 이미지 제공. 쿼리스트링
              활용 postImage default 값에 url 넣어주면 될 듯)
            </label>
            <input
              type='file'
              id='book-image'
              className='hidden'
              onChange={postBookRecordImage}
            />
          </>
        )}

        <textarea className='border-basic w-full resize-none h-2/4'></textarea>
        <div className='border-basic w-full'>태그들</div>
        <div className='flex justify-end w-full'>
          <button className='border-basic'>비공개</button>
        </div>
      </form>
    </div>
  );
};

export default BookRecordPage;
