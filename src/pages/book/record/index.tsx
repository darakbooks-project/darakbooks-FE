import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import { registerBookRecordApi, registerImageApi } from '@/api/record';
import styles from '@/components/book/record/Calendar.module.css';
import useImage from '@/hooks/useImage';
import useInput from '@/hooks/useInput';
import { bookRecordDataProps } from '@/types/record';

interface TagProps {
  id: number;
  data: string | number;
}

const BookRecordPage = () => {
  const registerImage = useMutation(registerImageApi);
  const registerBookRecord = useMutation(registerBookRecordApi);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [tag, setTag, reset] = useInput('');
  const [tagList, setTagList] = useState<TagProps[]>([]);
  const id = useRef(0);
  const [postImage, setPostImage] = useImage({}, registerImage);
  const router = useRouter();

  const today = new Intl.DateTimeFormat('kr').format(new Date());

  const getMonth = (date: Date) => {
    return new Date(date).toString().substring(4, 7).toUpperCase();
  };
  const getYear = (date: Date) => {
    return new Date(date).getFullYear();
  };

  const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const submitTag = () => {
    const newTag = {
      id: id.current,
      data: tag,
    };
    setTagList([...tagList, newTag]);
    reset();
    id.current++;
  };

  const deleteTag = (id: number) => {
    setTagList(tagList.filter((tag) => tag.id !== id));
  };

  const keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.nativeEvent.isComposing === false &&
      event.currentTarget.value.length !== 0 &&
      event.key === 'Enter'
    ) {
      submitTag();
    }
  };

  const submitRecord = () => {
    if (!postImage || !description || !startDate) {
      alert('이미지, 본문, 완독일을 지정해주세요');
      return;
    }

    const year = startDate?.getFullYear();
    const month = startDate?.getMonth() + 1;
    const day = startDate?.getDate();

    const formattedDate = `${year}-${month >= 10 ? month : '0' + month}-${
      day >= 10 ? day : '0' + day
    }`;

    const data: bookRecordDataProps = {
      record: {
        title: 'title test',
        thumbnail: 'thumbnail test',
        bookIsbn: 'bookIsbn text',
        text: description,
        recordImg: postImage.name as string,
        recordImgUrl: postImage.url as string,
        tags: tagList,
        readAt: formattedDate,
      },
    };

    registerBookRecord.mutate(data, {
      onSuccess: () => {
        alert('독서 기록 성공');
        router.push('/');
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  return (
    <div className='flex flex-col'>
      <section className='flex flex-col p-4 gap-8 pt-28 border-b-[#dfdfdf] border-b border-solid'>
        <article className='flex flex-col gap-2'>
          <h3 className='italic font-normal text-base leading-[19px] text-[#333333]'>
            {today}
          </h3>
          <h1 className='italic font-normal text-[32px] leading-[38px] text-[#333333]'>
            독서 기록
          </h1>
        </article>
        <section className='flex flex-col gap-4'>
          <div>
            <Link
              href={'/book/record/select'}
              className='flex flex-col w-full justify-center items-center h-24 border rounded-md border-dashed border-[#c2c1c1]'
            >
              <span>+</span>
              <span className='text-[12]'>책 등록하기</span>
            </Link>
          </div>
          <div className='flex items-center justify-end'>
            <DatePicker
              id='calendar'
              className='hidden'
              fixedHeight
              selected={startDate}
              shouldCloseOnSelect
              calendarClassName={styles.calenderWrapper}
              onChange={(date) => setStartDate(date)}
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                <div className='flex justify-between items-center px-4'>
                  <div
                    className='text-[#242424] text-xl'
                    onClick={decreaseMonth}
                  >
                    &lt;
                  </div>
                  <div>
                    <div className='text-base text-[#242424]'>
                      {getYear(date)}
                    </div>
                    <div className='text-xl text-[#242424]'>
                      {getMonth(date)}
                    </div>
                  </div>
                  <div
                    className='text-[#242424] text-xl'
                    onClick={increaseMonth}
                  >
                    &gt;
                  </div>
                </div>
              )}
              dayClassName={(d) =>
                d.getDate() === startDate?.getDate()
                  ? styles.selectedDay
                  : styles.unselectedDay
              }
            />
            <label
              htmlFor='calendar'
              className='w-full flex justify-center items-center h-8 border rounded-[50px] border-solid border-[#c1c1c1] '
            >
              {startDate ? startDate.toLocaleDateString('ko') : '완독일'}
            </label>
          </div>
          <textarea
            className='flex min-h-[19rem] p-4 rounded-md resize-none bg-[#fff8cb33]'
            placeholder='나의 독서 기록을 공유해보세요'
            value={description}
            onChange={changeDescription}
          ></textarea>
          <div>
            <label
              htmlFor='record-image'
              className='flex justify-center items-center w-[4.5rem] h-[4.5rem] rounded-md bg-[#dfdfdf]'
            >
              {postImage.url ? (
                <Image
                  src={postImage.url}
                  alt='메인이미지'
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='w-full h-auto'
                />
              ) : (
                '+'
              )}
            </label>
            <input
              type='file'
              className='hidden'
              id='record-image'
              accept='image/*'
              onChange={setPostImage}
            />
          </div>
        </section>
      </section>
      <section className='flex flex-col justify-center gap-4 p-4'>
        <h2 className='not-italic font-bold text-sm leading-5 text-[#333333]'>
          해시태그 추가하기
        </h2>
        <div className=' w-full flex flex-wrap gap-2'>
          {tagList.map((tag) => (
            <span
              key={tag.id}
              className='inline-flex border italic font-normal text-sm leading-[17px] text-[#333333] px-3 py-1.5 rounded-[50px] border-solid border-[#ebeaea]'
            >
              #{tag.data}
              <span className='ml-2' onClick={() => deleteTag(tag.id)}>
                X
              </span>
            </span>
          ))}
          <input
            className='w-auto inline-flex cursor-text  border italic font-normal text-sm leading-[17px] text-[#333333] px-3 py-1.5 rounded-[50px] border-solid border-[#ebeaea]'
            placeholder='# 태그입력'
            onChange={setTag}
            value={tag}
            onKeyDown={keyPress}
          />
        </div>
        <button
          className='h-14 bg-inherit border rounded-md border-solid border-[#333333]'
          onClick={submitRecord}
        >
          기록하기
        </button>
      </section>
    </div>
  );
};

export default BookRecordPage;
