import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useRef, useState } from 'react';

import { getBookDataByIsbnApi } from '@/api/book';
import { registerBookRecordApi, registerImageApi } from '@/api/record';
import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import Seo from '@/components/common/Seo';
import Toast from '@/components/common/Toast/Toast';
import useImage from '@/hooks/useImage';
import useInput from '@/hooks/useInput';
import PrettyNightFontLayout from '@/layout/PrettyNightFontLayout';
import { getBookDataByIsbnProps } from '@/types/book';
import { bookRecordDataProps } from '@/types/record';

const BottomNav = dynamic(() => import('@/components/common/BottomNav'));
const Header = dynamic(() => import('@/components/common/Header'));
const DatePickerComponent = dynamic(
  () => import('@/components/book/record/DatePickerComponent'),
);

interface TagProps {
  id: number;
  data: string;
}

const BookRecordPage = () => {
  const router = useRouter();
  const registerImage = useMutation(registerImageApi);
  const registerBookRecord = useMutation(registerBookRecordApi);
  const queryClient = useQueryClient();
  const { data: getBookDataByIsbn } = useQuery<getBookDataByIsbnProps>(
    ['getBookDataByIsbn', 'record'],
    () => getBookDataByIsbnApi(router.query.isbn as string),
    { enabled: !!router.query.isbn },
  );

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [tag, setTag, reset] = useInput('');
  const [tagList, setTagList] = useState<TagProps[]>([]);
  const id = useRef(0);
  const [postImage, setPostImage] = useImage({}, registerImage);

  const today = new Intl.DateTimeFormat('kr').format(new Date());

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
    if (!description || !startDate || !getBookDataByIsbn) {
      Toast.show({
        message: '도서, 본문, 완독일을 모두 지정해주세요.',
        type: 'warning',
      });
      return;
    }

    const year = startDate?.getFullYear();
    const month = startDate?.getMonth() + 1;
    const day = startDate?.getDate();

    const formattedDate = `${year}-${month >= 10 ? month : '0' + month}-${
      day >= 10 ? day : '0' + day
    }`;

    const data: bookRecordDataProps = {
      book: {
        bookIsbn: router.query.isbn as string,
        title: getBookDataByIsbn.documents[0].title,
        thumbnail: getBookDataByIsbn.documents[0].thumbnail,
        authors: [getBookDataByIsbn.documents[0].authors[0]],
      },
      record: {
        text: description,
        recordImg: (postImage.name as string) || (router.query.isbn as string),
        recordImgUrl:
          (postImage.url as string) || getBookDataByIsbn.documents[0].thumbnail,
        tags: tagList,
        readAt: formattedDate,
      },
    };

    registerBookRecord.mutate(data, {
      onSuccess: ({ recordId }) => {
        Toast.show({ message: '독서 기록에 성공했어요!', type: 'success' });
        queryClient.invalidateQueries(['feed']);
        router.push({
          pathname: '/book/feed',
          query: {
            recordId,
            type: 'RECORDS',
            ownerId: undefined,
          },
        });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const isValid = !(description && startDate && getBookDataByIsbn);

  return (
    <AuthRequiredPage>
      <Seo title='다락책방 | 기록' />
      <div className='flex flex-col pb-20 bg-[url("/images/record/record-background.svg")]'>
        <Header className='mt-12' />
        <section className='flex flex-col gap-8 p-4 pt-16 border-solid'>
          <article className='flex flex-col gap-2'>
            <h3 className='font-normal text-base leading-[19px] text-textBlack font-prettyNight'>
              {today}
            </h3>
            <h1 className='font-normal text-[32px] leading-[38px] text-textBlack font-prettyNight'>
              독서 기록
            </h1>
          </article>
          <section className='flex flex-col gap-4'>
            <div>
              <Link
                href={'/book/record/select'}
                className='flex flex-col w-full justify-center p-4 items-center border rounded-md border-dashed border-[#c2c1c1] cursor-pointer '
              >
                {getBookDataByIsbn &&
                getBookDataByIsbn.documents &&
                getBookDataByIsbn.documents[0] ? (
                  <section className='flex w-full h-full gap-4'>
                    <div className='w-1/5 '>
                      <Image
                        src={getBookDataByIsbn.documents[0].thumbnail}
                        alt='도서 이미지'
                        width='0'
                        height='0'
                        sizes='100vw'
                        className='w-full h-auto'
                      />
                    </div>
                    <article className='flex flex-col w-4/5 justify-evenly'>
                      <h3>{getBookDataByIsbn.documents[0].title}</h3>
                      <h4 className='text-[13px] text-[#999797]'>
                        {getBookDataByIsbn.documents[0].authors[0]}
                      </h4>
                    </article>
                  </section>
                ) : (
                  <>
                    <Image
                      src='/images/record/plus.svg'
                      alt='책 등록하기'
                      width={32}
                      height={32}
                    />
                    <span className='text-[#33333] text-[13px]'>
                      책 등록하기
                    </span>
                  </>
                )}
              </Link>
            </div>
            <div className='flex items-center justify-end'>
              <DatePickerComponent
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </div>
            <textarea
              className='flex min-h-[19rem] p-4 rounded-md resize-none bg-[#fff8cb33] font-prettyNight'
              placeholder='나의 독서 기록을 공유해보세요.'
              value={description}
              onChange={changeDescription}
            ></textarea>
          </section>
        </section>
        <section className='flex flex-col justify-center gap-4 p-4'>
          <input
            className='border-b border-solid border-b-[#C2C1C1] bg-inherit p-1 font-prettyNight'
            placeholder='# 엔터를 입력하여 태그를 등록할 수 있습니다.'
            onChange={setTag}
            value={tag}
            onKeyDown={keyPress}
          />
          <h2 className='text-sm font-bold text-textBlack'>추가한 태그</h2>
          <div className='flex flex-wrap w-full gap-2'>
            {tagList.map((tag) => (
              <span
                key={tag.id}
                className='flex items-center border font-normal text-sm leading-[17px] text-textBlack pl-3  rounded-[50px] border-[#ebeaea] font-prettyNight'
              >
                #{tag.data}
                <Image
                  src='/images/record/hashtag-delete.svg'
                  alt='hashtag-delete'
                  width={24}
                  height={24}
                  onClick={() => deleteTag(tag.id)}
                />
              </span>
            ))}
          </div>
          <div className='mb-4 '>
            <label
              htmlFor='record-image'
              className={` ${
                postImage.url
                  ? 'border-[none]'
                  : 'flex flex-col justify-center items-center min-h-[8rem] border rounded-md border-dashed border-[#C2C1C1] gap-1 cursor-pointer'
              } `}
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
                <>
                  <Image
                    src='/images/record/camera.svg'
                    alt='사진 등록하기'
                    width={32}
                    height={32}
                  />
                  <span className='text-[13px] text-textBlack'>
                    사진 추가하기
                  </span>
                  <span className='text-[10px] text-[#999797]'>
                    이미지는 1장만 업로드 할 수 있습니다.
                  </span>
                </>
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
          <button
            className={`${
              isValid
                ? 'h-14 border bg-[#DFDFDF] rounded-md text-[#ffffff]'
                : 'h-14 border bg-main rounded-md text-[#ffffff]'
            }`}
            onClick={submitRecord}
            disabled={isValid}
          >
            기록하기
          </button>
        </section>
      </div>
      <BottomNav />
    </AuthRequiredPage>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getBookDataByIsbn', 'record'], () =>
    getBookDataByIsbnApi(context.query?.isbn as string),
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

BookRecordPage.getLayout = function getLayout(page: ReactElement) {
  return <PrettyNightFontLayout>{page}</PrettyNightFontLayout>;
};

export default BookRecordPage;
