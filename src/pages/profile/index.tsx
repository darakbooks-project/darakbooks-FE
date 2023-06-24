import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { deleteBookShelfApi, getBookShelfApi } from '@/api/bookshelf';
import { getProfileApi } from '@/api/profile';
import { getCertainBookRecordsApi } from '@/api/record';
import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import BottomNav from '@/components/common/BottomNav';
import Modal from '@/components/common/Modal';
import ProfileLayout from '@/layout/ProfileLayout';
import { modalStateAtom } from '@/recoil/modal';
import { NextPageWithLayout } from '@/types/layout';

const ProfilePage: NextPageWithLayout = () => {
  const {
    query: { ownerId },
    push,
  } = useRouter();
  const [edit, setEdit] = useState(false);
  const deleteBookShelf = useMutation(deleteBookShelfApi);
  const [modal, setModal] = useRecoilState(modalStateAtom);
  const [bookId, setBookId] = useState('');
  const [certainBookTitle, setCertainBookTitle] = useState('');

  const { data: myCertainBookData } = useQuery(
    ['getCertainBookRecords', 'profile', bookId, 'mine'],
    () =>
      getCertainBookRecordsApi(
        Number.MAX_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER,
        bookId,
      ),
    {
      enabled: !!bookId && !ownerId,
    },
  );

  const { data: someoneCertainBookData } = useQuery(
    ['getCertainBookRecords', 'profile', bookId, ownerId],
    () =>
      getCertainBookRecordsApi(
        Number.MAX_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER,
        bookId,
        ownerId as string,
      ),
    {
      enabled: !!bookId && !!ownerId,
    },
  );

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
  const { data: someoneBookShelf, status: someoneBookShelfStatus } = useQuery(
    ['getBookShelf', 'profile', ownerId],
    () => getBookShelfApi(ownerId as string),
    { enabled: !!ownerId },
  );
  const {
    data: myBookShelf,
    status: myBookShelfStatus,
    refetch: myBookShelfRefetch,
  } = useQuery(
    ['getBookShelf', 'profile', 'mybookshelf'],
    () => getBookShelfApi(),
    { enabled: !ownerId },
  );

  const bookshelfData = ownerId ? someoneBookShelf : myBookShelf;
  const userData = ownerId ? someoneData : myData;
  const bookshelfStatus = ownerId ? someoneBookShelfStatus : myBookShelfStatus;
  const certainBookData = ownerId ? someoneCertainBookData : myCertainBookData;

  const removeBook = (bookId: string) => {
    deleteBookShelf.mutate(bookId, {
      onSuccess: () => {
        alert('삭제 되었습니다.');
        myBookShelfRefetch();
      },
      onError: (error) => {
        const { status } = error as AxiosError;
        if (status === 403) {
          alert('책의 독서기록이 작성 돼 있기 때문에 삭제가 안됩니다.');
        } else if (status === 404) {
          alert('사용자의 책장에 저장 돼 있지 않은 책입니다.');
        }
      },
    });
  };

  const openBookShelf = (bookIsbn: string, title: string) => {
    setModal({ type: 'BOOKSHELF' });
    setCertainBookTitle(title);
    setBookId(bookIsbn);
  };

  useEffect(() => {
    setModal({ type: 'HIDDEN' });
    setCertainBookTitle('');
    setBookId('');
  }, []);

  return (
    <AuthRequiredPage>
      {bookshelfStatus === 'success' && bookshelfData && (
        <>
          {!userData?.isMine && userData?.bookshelfIsHidden ? (
            <div className='h-[calc(100%_-_8.5rem)] flex flex-col justify-center items-center'>
              <h5 className='text-base font-medium text-[#333333]'>
                비공개 계정입니다.
              </h5>
              <p className='text-[13px] text-[#707070]'>
                이 계정은 확인할 수 없습니다.
              </p>
            </div>
          ) : (
            <>
              {bookshelfData.length < 1 ? (
                <div className='h-[calc(100%_-_8.5rem)] flex flex-col justify-center items-center'>
                  <h5 className='text-base font-medium text-[#333333]'>
                    책장이 비어있어요
                  </h5>
                </div>
              ) : (
                <>
                  <div className='flex items-center justify-between px-6 py-0 h-14'>
                    <span className='text-[15px] text-[#707070]'>
                      전체{' '}
                      <span className='text-[15px] text-[#67a68a]'>
                        {bookshelfData.length}
                      </span>
                      권
                    </span>
                    {userData?.isMine && (
                      <span
                        className='text-[15px] text-[#60B28D]'
                        onClick={() => setEdit((prev) => !prev)}
                      >
                        {edit ? '완료' : '편집'}
                      </span>
                    )}
                  </div>
                  <section className='grid grid-cols-[repeat(3,1fr)] px-4 py-0 pb-16'>
                    {bookshelfData.map((data) => (
                      <>
                        <article
                          className='relative flex flex-col items-center mb-4'
                          key={data.bookIsbn}
                          onClick={() =>
                            openBookShelf(data.bookIsbn, data.title)
                          }
                        >
                          {edit && (
                            <Image
                              src='/images/record/delete.svg'
                              alt='delete'
                              width={34}
                              height={34}
                              className='absolute -right-3 -top-3'
                              onClick={(
                                event: React.MouseEvent<HTMLImageElement>,
                              ) => {
                                event.stopPropagation();
                                removeBook(data.bookIsbn);
                              }}
                            />
                          )}

                          <section className='w-full shadow-[0px_4px_8px_rgba(0,0,0,0.15)] mb-4 p-[7px]'>
                            <Image
                              src={data.thumbnail}
                              alt={data.title}
                              width='0'
                              height='0'
                              sizes='100vw'
                              className='w-full h-[9.5rem] s:h-[14rem] rounded-[0px_3px_3px_0px] shadow-[0px_0px_7px_rgba(0, 0, 0, 0.25)]'
                            />
                          </section>
                          <div className='flex flex-col items-center w-full'>
                            <h3 className='text-[13px] text-[#333333] mb-[5px] text-center'>
                              {data.title}
                            </h3>
                            <h4 className='text-[11px] text-[#707070]'>
                              {data.authors[0]}
                            </h4>
                          </div>
                        </article>
                      </>
                    ))}
                    {modal.type === 'BOOKSHELF' && (
                      <Modal>
                        <div
                          className='flex text-lg justify-end'
                          onClick={() => setModal({ type: 'HIDDEN' })}
                        >
                          X
                        </div>
                        <section className='flex flex-col items-center'>
                          <h3 className='font-bold text-[21px] text-[#333333] text-center'>
                            {certainBookTitle}
                          </h3>
                          <h4 className='font-normal text-[15px] text-[#333333]'>
                            총{' '}
                            <span className='font-normal text-[15px] text-[#60b28d]'>
                              {certainBookData?.records.length}개
                            </span>
                            의 도서 기록을 작성하셨어요!
                          </h4>
                        </section>
                        <ul className='h-[12.75rem] grid grid-cols-[repeat(3,1fr)] gap-2 overflow-y-scroll my-4'>
                          {certainBookData?.records.map((record) => (
                            <Image
                              key={record.recordId}
                              src={record.recordImgUrl}
                              alt={record.text}
                              width='0'
                              height='0'
                              sizes='100vw'
                              className='flex justify-center items-center w-[6.125rem] h-[6.125rem]  rounded-lg'
                              onClick={() =>
                                push({
                                  pathname: '/book/feed',
                                  query: {
                                    isbn: record.book.bookIsbn,
                                    recordId: record.recordId,
                                    type: 'BOOKSHELF',
                                    ownerId,
                                  },
                                })
                              }
                            />
                          ))}
                          {userData?.isMine && (
                            <li
                              className='flex justify-center items-center text-[54px] font-[lighter] text-[#999797] w-[6.125rem] h-[6.125rem] border rounded-lg border-dashed border-[#999797]'
                              onClick={() => {
                                push({
                                  pathname: '/book/record',
                                  query: {
                                    isbn: bookId,
                                  },
                                });
                              }}
                            >
                              +
                            </li>
                          )}
                        </ul>
                        <button
                          className='flex w-full justify-center items-center h-[3.125rem] text-white rounded-[10px] bg-[#60b28d]'
                          onClick={() =>
                            push({
                              pathname: '/book/detail',
                              query: {
                                isbn: bookId,
                              },
                            })
                          }
                        >
                          책정보
                        </button>
                      </Modal>
                    )}
                  </section>
                </>
              )}
            </>
          )}
          <BottomNav />
        </>
      )}
    </AuthRequiredPage>
  );
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient();

  if (context.query.ownerId) {
    Promise.all([
      await queryClient.prefetchQuery(
        ['getUserProfile', 'profile', context.query.ownerId],
        () => getProfileApi(context.query.ownerId as string),
      ),
      await queryClient.prefetchQuery(
        ['getBookShelf', 'profile', context.query.ownerId],
        () => getBookShelfApi(context.query.ownerId as string),
      ),
    ]);
  } else {
    Promise.all([
      await queryClient.prefetchQuery(
        ['getUserProfile', 'profile', 'myprofile'],
        () => getProfileApi(),
      ),
      await queryClient.prefetchQuery(
        ['getBookShelf', 'profile', 'mybookshelf'],
        () => getBookShelfApi(),
      ),
    ]);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProfilePage;
