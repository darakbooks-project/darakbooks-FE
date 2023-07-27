import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo } from 'react';

import { getProfileApi } from '@/api/profile';
import {
  fetchRecord,
  getAllRecordsApi,
  getCertainBookRecordsApi,
} from '@/api/record';
import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import BottomNav from '@/components/common/BottomNav';
import Header from '@/components/common/Header';
import Seo from '@/components/common/Seo';
import PrettyNightFontLayout from '@/layout/PrettyNightFontLayout';
import { suitableDescriptionHandler } from '@/utils/helpers/suitableDescriptionHandler';

const BookDetailFeed = () => {
  const {
    query: { type, recordId, isbn, ownerId },
    push,
  } = useRouter();
  const maxNumber = Number.MAX_SAFE_INTEGER;
  const undefinedOwnerId = ownerId === '';
  const { data: me } = useQuery(['me'], () => getProfileApi());

  const { data: myRecords, status: myRecordsStatus } = useQuery(
    ['MyRecords'],
    () => getAllRecordsApi(maxNumber, maxNumber),
    {
      enabled: !!(type === 'RECORDS' && undefinedOwnerId),
    },
  );

  const { data: someoneRecords, status: someoneRecordsStatus } = useQuery(
    ['SomeoneRecords'],
    () => getAllRecordsApi(maxNumber, maxNumber, ownerId + ''),
    {
      enabled: !!(type === 'RECORDS' && ownerId),
    },
  );

  const { data: myBookShelfData, status: myBookShelfStatus } = useQuery(
    ['MyDataFromBookShelf'],
    () => getCertainBookRecordsApi(maxNumber, maxNumber, isbn + ''),
    {
      enabled: !!(type === 'BOOKSHELF' && isbn && undefinedOwnerId),
    },
  );

  const { data: someoneBookShelfData, status: someoneBookShelfStatus } =
    useQuery(
      ['SomeoneDataFromBookShelf'],
      () =>
        getCertainBookRecordsApi(maxNumber, maxNumber, isbn + '', ownerId + ''),
      {
        enabled: !!(type === 'BOOKSHELF' && isbn && ownerId),
      },
    );

  const { data: mainData, status: mainStatus } = useQuery(
    ['AllDataFromMain'],
    () => fetchRecord(maxNumber, maxNumber),
    {
      enabled: !!(type === 'MAIN' && !isbn),
    },
  );

  const { data: detailData, status: detailStatus } = useQuery(
    ['AllDataFromDetail'],
    () => fetchRecord(maxNumber, maxNumber, isbn as string),
    {
      enabled: !!(type === 'DETAIL' && isbn),
    },
  );

  const data = useMemo(() => {
    switch (type) {
      case 'MAIN': {
        return mainData;
      }
      case 'DETAIL': {
        return detailData;
      }
      case 'BOOKSHELF': {
        if (undefinedOwnerId) {
          return myBookShelfData;
        } else {
          return someoneBookShelfData;
        }
      }
      case 'RECORDS': {
        if (undefinedOwnerId) {
          return myRecords;
        } else {
          return someoneRecords;
        }
      }
    }
  }, [
    detailData,
    mainData,
    myBookShelfData,
    myRecords,
    someoneBookShelfData,
    someoneRecords,
    type,
    undefinedOwnerId,
  ]);

  const status = useMemo(() => {
    switch (type) {
      case 'MAIN': {
        return mainStatus;
      }
      case 'DETAIL': {
        return detailStatus;
      }
      case 'BOOKSHELF': {
        if (undefinedOwnerId) {
          return myBookShelfStatus;
        } else {
          return someoneBookShelfStatus;
        }
      }
      case 'RECORDS': {
        if (undefinedOwnerId) {
          return myRecordsStatus;
        } else {
          return someoneRecordsStatus;
        }
      }
    }
  }, [
    detailStatus,
    mainStatus,
    myBookShelfStatus,
    myRecordsStatus,
    someoneBookShelfStatus,
    someoneRecordsStatus,
    type,
    undefinedOwnerId,
  ]);
  // 두개 합치기

  const currentData = data?.records.find(
    (item) => item.recordId === parseInt(recordId + ''),
  );
  const currentIndex = data?.records.findIndex((item) => item === currentData);
  const dataSize = data?.records.length;

  const nextPage = () => {
    if (currentIndex === parseInt(dataSize + '') - 1) {
      return;
    }
    const nextRecordId = data?.records[currentIndex! + 1].recordId;
    switch (type) {
      case 'MAIN': {
        push({
          pathname: '/book/feed',
          query: {
            recordId: nextRecordId,
            type: 'MAIN',
          },
        });
        break;
      }
      case 'DETAIL': {
        push({
          pathname: '/book/feed',
          query: {
            recordId: nextRecordId,
            isbn,
            type: 'DETAIL',
          },
        });
        break;
      }
      case 'BOOKSHELF': {
        push({
          pathname: '/book/feed',
          query: {
            recordId: nextRecordId,
            isbn,
            ownerId,
            type: 'BOOKSHELF',
          },
        });
        break;
      }
      case 'RECORDS': {
        push({
          pathname: '/book/feed',
          query: {
            recordId: nextRecordId,
            ownerId,
            type: 'RECORDS',
          },
        });
        break;
      }
    }
  };

  const prevPage = () => {
    if (currentIndex === 0) {
      return;
    }
    const nextRecordId = data?.records[currentIndex! - 1].recordId;
    switch (type) {
      case 'MAIN': {
        push({
          pathname: '/book/feed',
          query: {
            recordId: nextRecordId,
            type: 'MAIN',
          },
        });
        break;
      }
      case 'DETAIL': {
        push({
          pathname: '/book/feed',
          query: {
            recordId: nextRecordId,
            isbn,
            type: 'DETAIL',
          },
        });
        break;
      }
      case 'BOOKSHELF': {
        push({
          pathname: '/book/feed',
          query: {
            recordId: nextRecordId,
            isbn,
            ownerId,
            type: 'BOOKSHELF',
          },
        });
        break;
      }
      case 'RECORDS': {
        push({
          pathname: '/book/feed',
          query: {
            recordId: nextRecordId,
            ownerId,
            type: 'RECORDS',
          },
        });
        break;
      }
    }
  };

  const onProfile = (ownerId: string) => {
    if (me?.userId === ownerId) {
      push('/profile');
    } else {
      push({ pathname: '/profile', query: { ownerId } });
    }
  };

  const {
    book: { title },
    text,
    recordImgUrl,
  } = currentData!;

  const suitableDescription = suitableDescriptionHandler(text);

  return (
    <AuthRequiredPage>
      <Seo
        title={`다락책방 | ${title}를 읽고`}
        description={suitableDescription}
        image={recordImgUrl}
      />
      <div className='flex flex-col gap-4 pt-8 pb-16 bg-[url("/images/record/record-background.svg")]'>
        <Header />
        {status === 'success' && currentData && (
          <>
            <section className='flex items-center justify-center '>
              <button onClick={prevPage}>
                <Image
                  src='/images/feed/feed-left.svg'
                  alt='left'
                  width={32}
                  height={32}
                />
              </button>
              <div className='text-[15px] text-[#232323] px-4 font-prettyNight'>
                {currentData.readAt.substring(0, 10).replaceAll('-', '.')}
              </div>
              <button onClick={nextPage}>
                <Image
                  src='/images/feed/feed-right.svg'
                  alt='left'
                  width={32}
                  height={32}
                />
              </button>
            </section>
            <section className='flex items-center justify-between w-full h-10 px-6'>
              <article
                className='flex items-center'
                onClick={() => onProfile(currentData.user.userId)}
              >
                <Image
                  src={currentData.user.photoUrl}
                  alt={currentData.user.nickname}
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='h-10 w-10 mr-2 rounded-[50%] '
                />
                <h3 className='text-[#232323] font-prettyNight'>
                  {currentData.user.nickname}
                </h3>
              </article>
            </section>
            <Image
              src={currentData.recordImgUrl}
              alt={currentData.recordImgUrl}
              width='0'
              height='0'
              sizes='100vw'
              className='w-full h-[22rem]'
            />
            <article className='w-full leading-[160%] text-[15px] rounded-md px-6 font-prettyNight'>
              {currentData.text}
            </article>
            <ul className='inline-flex flex-wrap w-full px-6'>
              {currentData.tags.map((tag) => (
                <li
                  className='flex justify-center items-center border font-normal text-[13px] text-textBlack mr-2 px-3 py-[5px] rounded-[50px] border-solid border-[#ebeaea] font-prettyNight'
                  key={tag.id}
                >
                  #{tag.data}
                </li>
              ))}
            </ul>
            <section className='flex flex-col w-full px-6 pb-6'>
              <h2 className='not-italic font-normal text-base text-[#242424] mb-4'>
                도서 정보
              </h2>
              <article
                className=' flex gap-4 p-4 rounded-md bg-[#ffffff] mb-3'
                onClick={() =>
                  push({
                    pathname: '/book/detail',
                    query: { isbn: currentData.book.bookIsbn },
                  })
                }
              >
                <div className='w-1/5'>
                  <Image
                    src={currentData.book.thumbnail}
                    alt='책 표지'
                    width='0'
                    height='0'
                    sizes='100vw'
                    className='w-full h-auto'
                  />
                </div>
                <div className='flex flex-col w-4/5 justify-evenly'>
                  <h1 className='text-base'>{currentData.book.title}</h1>
                  <h3 className='text-[13px] text-[#999797]'>
                    {currentData.book.authors[0]}
                  </h3>
                </div>
              </article>
            </section>
          </>
        )}
        <BottomNav />
      </div>
    </AuthRequiredPage>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient();
  const maxNumber = Number.MAX_SAFE_INTEGER;
  const {
    query: { isbn, ownerId },
  } = context;

  switch (context.query.type) {
    case 'MAIN': {
      await queryClient.prefetchQuery(['AllDataFromMain'], () =>
        fetchRecord(maxNumber, maxNumber),
      );
      break;
    }
    case 'DETAIL': {
      await queryClient.prefetchQuery(['AllDataFromDetail'], () =>
        fetchRecord(maxNumber, maxNumber, isbn + ''),
      );
      break;
    }
    case 'BOOKSHELF': {
      if (ownerId) {
        await queryClient.prefetchQuery(['SomeoneDataFromBookShelf'], () =>
          getCertainBookRecordsApi(
            maxNumber,
            maxNumber,
            isbn + '',
            ownerId + '',
          ),
        );
      } else {
        await queryClient.prefetchQuery(['MyDataFromBookShelf'], () =>
          getCertainBookRecordsApi(maxNumber, maxNumber, isbn + ''),
        );
      }
      break;
    }
    case 'RECORDS': {
      if (ownerId) {
        await queryClient.prefetchQuery(['SomeoneRecords'], () =>
          getAllRecordsApi(maxNumber, maxNumber, ownerId + ''),
        );
      } else {
        await queryClient.prefetchQuery(['MyRecords'], () =>
          getAllRecordsApi(maxNumber, maxNumber),
        );
      }
      break;
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

BookDetailFeed.getLayout = function getLayout(page: ReactElement) {
  return <PrettyNightFontLayout>{page}</PrettyNightFontLayout>;
};

export default BookDetailFeed;
