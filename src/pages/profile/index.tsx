import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { deleteBookShelfApi, getBookShelfApi } from '@/api/bookshelf';
import { getProfileApi } from '@/api/profile';
import { getCertainBookRecordsApi } from '@/api/record';
import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import Seo from '@/components/common/Seo';
import Toast from '@/components/common/Toast/Toast';
import ProfileLayout from '@/layout/ProfileLayout';
import { modalStateAtom } from '@/recoil/modal';
import { NextPageWithLayout } from '@/types/layout';

const Modal = dynamic(() => import('@/components/common/Modal'));
const BottomNav = dynamic(() => import('@/components/common/BottomNav'));

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
  const [deleteBookShelfItem, setDeleteBookShelftItem] = useState('');

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
        myBookShelfRefetch();
        setModal({ type: 'HIDDEN' });
      },
      onError: (error) => {
        const { status } = error as AxiosError;
        if (status === 403) {
          Toast.show({
            message: '해당 책의 독서기록이 존재하여 삭제할 수 없어요!',
            type: 'warning',
          });
        } else if (status === 404) {
          Toast.show({
            message: '책장에 존재하지 않는 책이에요.',
            type: 'error',
          });
        }
      },
    });
  };

  const openBookShelf = (bookIsbn: string, title: string) => {
    if (!edit) {
      setModal({ type: 'BOOKSHELF' });
      setCertainBookTitle(title);
      setBookId(bookIsbn);
    }
  };

  const openBookShelfDelete = (bookIsbn: string) => {
    setModal({ type: 'DELETEBOOKSHELF' });
    setDeleteBookShelftItem(bookIsbn);
  };

  useEffect(() => {
    setModal({ type: 'HIDDEN' });
    setCertainBookTitle('');
    setBookId('');
  }, []);

  return (
    <AuthRequiredPage>
      <Seo
        title={`다락책방 | ${userData?.nickname}`}
        description={`${userData?.nickname}님의 책장입니다`}
        image={userData?.photoUrl}
      />
      {bookshelfStatus === 'success' && bookshelfData && (
        <>
          {!userData?.isMine && userData?.bookshelfIsHidden ? (
            <div className='h-[calc(100%_-_8.5rem)] flex flex-col justify-center items-center'>
              <h5 className='text-base font-medium text-textBlack'>
                비공개 계정입니다.
              </h5>
              <p className='text-[13px] text-textGray'>
                이 계정은 확인할 수 없습니다.
              </p>
            </div>
          ) : (
            <>
              {bookshelfData.length < 1 ? (
                <div className='h-[calc(100%_-_8.5rem)] flex flex-col justify-center items-center'>
                  <h5 className='text-base font-medium text-textBlack'>
                    책장이 비어있어요
                  </h5>
                </div>
              ) : (
                <>
                  <div className='flex items-center justify-between px-6 py-0 h-14'>
                    <span className='text-[15px] text-textGray'>
                      전체{' '}
                      <span className='text-[15px] text-main'>
                        {bookshelfData.length}
                      </span>
                      권
                    </span>
                    {userData?.isMine && (
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
                    )}
                  </div>
                  <section className='grid grid-cols-[repeat(3,1fr)] px-4 pb-20 bg-[#ffffff]'>
                    {bookshelfData.map((data) => (
                      <article
                        className='relative flex flex-col items-center mb-4'
                        key={data.bookIsbn}
                        onClick={() => openBookShelf(data.bookIsbn, data.title)}
                      >
                        {edit && (
                          <Image
                            src='/images/profile/delete.svg'
                            alt='delete'
                            width={32}
                            height={32}
                            className='absolute -right-3 -top-3'
                            onClick={(
                              event: React.MouseEvent<HTMLImageElement>,
                            ) => {
                              event.stopPropagation();
                              openBookShelfDelete(data.bookIsbn);
                            }}
                          />
                        )}

                        <section className='w-full shadow-[0px_4px_8px_rgba(0,0,0,0.15)] mb-4 p-[7px]'>
                          <Image
                            src={data.thumbnail}
                            alt={data.title}
                            width='120'
                            height='152'
                            className='w-full h-[9.5rem] s:h-[14rem] rounded-[0px_3px_3px_0px] shadow-[0px_0px_7px_rgba(0, 0, 0, 0.25)]'
                            loading='lazy'
                          />
                        </section>
                        <div className='flex flex-col items-center w-full'>
                          <h3 className='text-[13px] text-textBlack mb-[5px] text-center'>
                            {data.title}
                          </h3>
                          <h4 className='text-[11px] text-textGray'>
                            {data.authors[0]}
                          </h4>
                        </div>
                      </article>
                    ))}
                    {modal.type === 'BOOKSHELF' && (
                      <Modal>
                        <div
                          className='flex justify-end text-lg'
                          onClick={() => setModal({ type: 'HIDDEN' })}
                        >
                          X
                        </div>
                        <section className='flex flex-col items-center'>
                          <h3 className='font-bold text-[21px] text-textBlack text-center'>
                            {certainBookTitle}
                          </h3>
                          <h4 className='font-normal text-[15px] text-textBlack'>
                            총{' '}
                            <span className='font-normal text-[15px] text-main'>
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
                              width='98'
                              height='98'
                              className='w-[6.125rem] h-[6.125rem] rounded-lg'
                              loading='lazy'
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
                          className='flex w-full justify-center items-center h-[3.125rem] text-white rounded-[10px] bg-main'
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
                    {modal.type === 'DELETEBOOKSHELF' && (
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
                              className='w-3/4 h-12 bg-[#F3F3F3] rounded-lg mr-3 text-textBlack'
                            >
                              취소
                            </button>
                            <button
                              onClick={() => removeBook(deleteBookShelfItem)}
                              className='w-3/4 h-12 bg-[#F05050] rounded-lg text-white disabled:bg-zinc-300'
                            >
                              삭제
                            </button>
                          </div>
                        </div>
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
