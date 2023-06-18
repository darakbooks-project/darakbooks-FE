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
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';

import { deleteBookShelfApi, getBookShelfApi } from '@/api/bookshelf';
import { getProfileApi } from '@/api/profile';
import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import BottomNav from '@/components/common/BottomNav';
import Modal from '@/components/common/Modal';
import ProfileLayout from '@/layout/ProfileLayout';
import { modalStateAtom } from '@/recoil/modal';
import { NextPageWithLayout } from '@/types/layout';

const ProfilePage: NextPageWithLayout = () => {
  const router = useRouter();
  const mine = !router.query.ownerId;
  const [edit, setEdit] = useState(false);
  const deleteBookShelf = useMutation(deleteBookShelfApi);
  const [modal, setModal] = useRecoilState(modalStateAtom);

  const { data: someoneData } = useQuery(
    ['getUserProfile', 'profile', router.query.ownerId],
    () => getProfileApi(router.query.ownerId as string),
    { enabled: !!router.query.ownerId },
  );
  const { data: myData } = useQuery(
    ['getUserProfile', 'profile', 'myprofile'],
    () => getProfileApi(),
    { enabled: !router.query.ownerId },
  );
  const { data: someoneBookShelf, status: someoneBookShelfStatus } = useQuery(
    ['getBookShelf', 'profile', router.query.ownerId],
    () => getBookShelfApi(router.query.ownerId as string),
    { enabled: !!router.query.ownerId },
  );
  const {
    data: myBookShelf,
    status: myBookShelfStatus,
    refetch,
  } = useQuery(
    ['getBookShelf', 'profile', 'mybookshelf'],
    () => getBookShelfApi(),
    { enabled: !router.query.ownerId },
  );

  const bookshelfData = mine ? myBookShelf : someoneBookShelf;
  const userData = mine ? myData : someoneData;
  const bookshelfStatus = mine ? myBookShelfStatus : someoneBookShelfStatus;

  const removeBook = (bookId: string) => {
    deleteBookShelf.mutate(bookId, {
      onSuccess: () => {
        alert('삭제 되었습니다.');
        refetch();
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

  return (
    <AuthRequiredPage>
      {bookshelfStatus === 'success' && bookshelfData && (
        <>
          {!userData?.isMine && userData?.bookshelfIsHidden ? (
            <div>비공개</div>
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
                    className='text-[15px] text-[#333333]'
                    onClick={() => setEdit((prev) => !prev)}
                  >
                    {edit ? '완료' : '편집'}
                  </span>
                )}
              </div>
              <section className='grid grid-cols-[repeat(3,1fr)] px-4 py-0 pb-16'>
                {bookshelfData.map((data) => (
                  <>
                    {modal.type === 'BOOKSHELF' && <Modal>하이</Modal>}
                    <article
                      className='relative flex flex-col items-center mb-4'
                      key={data.bookIsbn}
                      onClick={() => setModal({ type: 'BOOKSHELF' })}
                    >
                      {edit && (
                        <div
                          className='absolute flex items-center justify-center w-4 h-4 text-[4px] bg-[#707070] rounded-[50%] right-0.5'
                          onClick={() => removeBook(data.bookIsbn)}
                        >
                          X
                        </div>
                      )}

                      <section className='w-full shadow-[0px_4px_8px_rgba(0,0,0,0.15)] mb-4 p-[7px]'>
                        <Image
                          src={data.thumbnail}
                          alt={data.title}
                          width='0'
                          height='0'
                          sizes='100vw'
                          className='w-full h-[9.5rem]  rounded-[0px_3px_3px_0px] shadow-[0px_0px_7px_rgba(0, 0, 0, 0.25)]'
                        />
                      </section>
                      <div className='flex flex-col items-center w-full'>
                        <h3 className='text-[13px] text-[#333333] mb-[5px]'>
                          {data.title}
                        </h3>
                        <h4 className='text-[11px] text-[#707070]'>
                          {data.authors[0]}
                        </h4>
                      </div>
                    </article>
                  </>
                ))}
              </section>
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
