import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilState } from 'recoil';

import { getProfileApi } from '@/api/profile';
import { deleteRecordApi, getAllRecordsApi } from '@/api/record';
import BottomNav from '@/components/common/BottomNav';
import Modal from '@/components/common/Modal';
import ProfileLayout from '@/layout/ProfileLayout';
import { modalStateAtom } from '@/recoil/modal';
import { NextPageWithLayout } from '@/types/layout';

const MyFeed: NextPageWithLayout = () => {
  const {
    query: { ownerId },
    push,
  } = useRouter();
  const [modal, setModal] = useRecoilState(modalStateAtom);
  const [edit, setEdit] = useState(false);
  const [deleteRecordItem, setDeleteItem] = useState('');
  const deleteRecord = useMutation(deleteRecordApi);
  const { data: someoneData } = useQuery(
    ['getUserProfile', 'profile', ownerId],
    () => getProfileApi(ownerId as string),
    { enabled: !!ownerId },
  );
  const { data: myData } = useQuery(
    ['getUserProfile', 'profile', 'myprofile'],
    () => getProfileApi(),
    { enabled: !ownerId },
  );

  const [ref, inView] = useInView();
  const {
    fetchNextPage: myRecordsFetchNextPage,
    hasNextPage: myRecordsHasNextPage,
    data: getAllMyRecords,
    status: myRecordsStatus,
    refetch,
  } = useInfiniteQuery(
    ['getAllMyRecords', 'myfeed'],
    ({ pageParam = Number.MAX_SAFE_INTEGER }) => getAllRecordsApi(pageParam, 9),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.lastId) {
          return;
        }
        return lastPage.lastId;
      },
      enabled: !ownerId,
    },
  );
  const {
    fetchNextPage: someoneRecordsFetchNextPage,
    hasNextPage: someoneRecordsHasNextPage,
    data: getAllSomeoneRecords,
    status: someoneRecordsStatus,
  } = useInfiniteQuery(
    ['getAllSomeoneRecords', 'someonefeed'],
    ({ pageParam = Number.MAX_SAFE_INTEGER }) =>
      getAllRecordsApi(pageParam, 9, ownerId as string),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.lastId) {
          return;
        }
        return lastPage.lastId;
      },
      enabled: !!ownerId,
    },
  );

  const recordsData = ownerId ? getAllSomeoneRecords : getAllMyRecords;
  const userData = ownerId ? someoneData : myData;
  const recordsStatus = ownerId ? someoneRecordsStatus : myRecordsStatus;
  const hasNextPage = ownerId
    ? someoneRecordsHasNextPage
    : myRecordsHasNextPage;
  const allRecords = recordsData?.pages.flatMap((page) => page.records);

  const fetchNextPage = ownerId
    ? someoneRecordsFetchNextPage
    : myRecordsFetchNextPage;

  useEffect(() => {
    if (hasNextPage && inView) fetchNextPage();
  }, [fetchNextPage, getAllMyRecords, hasNextPage, inView]);

  const removeRecord = (id: string) => {
    deleteRecord.mutate(id, {
      onSuccess: () => {
        refetch();
        setModal({ type: 'HIDDEN' });
      },
    });
  };

  const openRecordDelete = (recordId: string) => {
    setModal({ type: 'DELETERECORD' });
    setDeleteItem(recordId);
  };

  const onRecordClick = (recordId: string) => {
    if (!edit) {
      push({
        pathname: '/book/feed',
        query: {
          recordId: recordId,
          type: 'RECORDS',
          ownerId,
        },
      });
    }
  };

  return (
    <>
      {recordsStatus === 'success' && allRecords && (
        <>
          {!userData?.isMine && userData?.bookshelfIsHidden ? (
            <div className='h-[calc(100%_-_8.5rem)] flex flex-col justify-center items-center leading-[1.3rem]'>
              <h5 className='text-base font-medium text-[#333333]'>
                비공개 계정입니다.
              </h5>
              <p className='text-[13px] text-[#707070]'>
                이 계정은 확인할 수 없습니다.
              </p>
            </div>
          ) : (
            <>
              {allRecords.length < 1 ? (
                <div className='h-[calc(100%_-_8.5rem)] flex flex-col justify-center items-center'>
                  <h5 className='text-base font-medium text-[#333333]'>
                    기록이 없어요
                  </h5>
                </div>
              ) : (
                <>
                  <div className='flex items-center justify-between px-6 py-0 h-14'>
                    <span className='text-[15px] text-[#707070]'>
                      전체{' '}
                      <span className='text-[15px] text-main'>
                        {allRecords.length}
                      </span>
                      개
                    </span>
                    {userData?.isMine ? (
                      <span
                        className={
                          edit
                            ? 'text-[15px] text-[#F05050]'
                            : 'text-[15px] text-main'
                        }
                        onClick={() => setEdit((prev) => !prev)}
                      >
                        {edit ? '삭제' : '편집'}
                      </span>
                    ) : null}
                  </div>
                  <section className='grid grid-cols-[repeat(3,1fr)] gap-0.5 bg-[#ffffff] pb-20'>
                    {allRecords.map((item) => (
                      <div key={item.recordId} className='relative'>
                        {edit && (
                          <Image
                            src='/images/profile/red-delete.svg'
                            alt='delete'
                            width={32}
                            height={32}
                            className='absolute right-0 bottom-0'
                            onClick={() => openRecordDelete(item.recordId + '')}
                          />
                        )}
                        <Image
                          src={item.recordImgUrl}
                          alt={item.book.title}
                          width='0'
                          height='0'
                          sizes='100vw'
                          className='h-32 w-full s:h-[12rem]'
                          onClick={() => onRecordClick(item.recordId + '')}
                        />
                      </div>
                    ))}
                  </section>
                  <div ref={ref}></div>
                  {modal.type === 'DELETERECORD' && (
                    <Modal>
                      <div className='flex flex-col items-center justify-center'>
                        <Image
                          src='/images/profile/bin.svg'
                          alt='bin'
                          width={54}
                          height={54}
                          className='my-2 mb-4'
                        />
                        <h3 className='text-xl font-bold'>
                          기록을 삭제하시겠어요?
                        </h3>
                        <p className='pb-7'>
                          선택한 기록은 삭제되어 복구되지 않습니다.
                        </p>
                        <div className='flex w-full'>
                          <button
                            onClick={() => setModal({ type: 'HIDDEN' })}
                            className='w-3/4 h-12 bg-[#F3F3F3] rounded-lg mr-3 text-[#333333]'
                          >
                            취소
                          </button>
                          <button
                            onClick={() => removeRecord(deleteRecordItem)}
                            className='w-3/4 h-12 bg-[#F05050] rounded-lg text-white disabled:bg-zinc-300'
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </Modal>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
      <BottomNav />
    </>
  );
};

MyFeed.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient();

  if (context.query.ownerId) {
    await queryClient.prefetchQuery(
      ['getUserProfile', 'profile', context.query.ownerId],
      () => getProfileApi(context.query.ownerId as string),
    );
  } else {
    await queryClient.prefetchQuery(
      ['getUserProfile', 'profile', 'myprofile'],
      () => getProfileApi(),
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MyFeed;
