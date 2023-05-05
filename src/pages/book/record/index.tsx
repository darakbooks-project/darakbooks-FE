import 'react-datepicker/dist/react-datepicker.css';

import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import { MAX_FILE_SIZE } from '@/constants/file';

interface postImageProps {
  id: string;
  url: string;
}

interface TagProps {
  id: number;
  data: string;
}

const BookRecordPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [postImage, setPostImage] = useState<postImageProps>();
  const [description, setDescription] = useState('');
  const [privateMode, setPrivateMode] = useState(false);
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState<TagProps[]>([]);
  const id = useRef(0);

  const {
    query: { bid },
  } = useRouter();

  const postBookRedcord = () => {
    const formattedDate = startDate.toISOString().substring(0, 10);

    {
      /*
    1. react-query mutate
    */
    }

    console.log(postImage, description, formattedDate, privateMode, tagList);
  };

  const submitTag = () => {
    const newTag = {
      id: id.current,
      data: tag,
    };
    setTagList([...tagList, newTag]);
    setTag('');
    id.current++;
  };

  const changeTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.currentTarget.value);
  };

  const keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length !== 0 && event.key === 'Enter') {
      submitTag();
    }
  };

  const togglePrivateMode = () => {
    setPrivateMode((prev) => !prev);
  };

  const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.currentTarget.value);
  };

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
      <div className='h-1/5  flex flex-row '>
        <div className='w-1/3 border-basic'>IMAGE</div>
        <div className='flex flex-col pl-5'>
          <button className='border-basic' disabled={!!bid}>
            책 선택
          </button>
          <DatePicker
            className='border-basic'
            selected={startDate}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onChange={(date) => setStartDate(date!)}
          />
        </div>
      </div>
      <div className='h-4/5  flex flex-col   space-y-5'>
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
              className='flex border-basic w-full h-1/5 mt-5 justify-center items-center'
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

        <textarea
          value={description}
          onChange={changeDescription}
          className='border-basic w-full resize-none h-2/5'
        ></textarea>
        <div className='border-4 border-red-500 w-full flex flex-wrap'>
          <div className='flex flex-wrap'>
            {tagList.map((tag) => (
              <div
                className='flex items-center justify-between p-1 border-basic rounded-md m-1'
                key={tag.id}
              >
                #{tag.data} ❌
              </div>
            ))}
          </div>
          <input
            className='w-auto inline-flex outline-none cursor-text border-none m-1'
            type='text'
            placeholder='#태그 입력'
            onChange={changeTag}
            value={tag}
            onKeyPress={keyPress}
          />
        </div>
        <div className='flex justify-end w-full'>
          <div className='border-basic' onClick={togglePrivateMode}>
            {privateMode ? '공개' : '비공개'}
          </div>
          <button className='border-basic' onClick={postBookRedcord}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookRecordPage;
