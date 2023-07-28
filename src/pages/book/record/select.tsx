import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React from 'react';
import { ReactElement } from 'react';
import { useRecoilState } from 'recoil';

import { getBookShelfApi } from '@/api/bookshelf';
import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import SelectModal from '@/components/book/record/SelectModal';
import Seo from '@/components/common/Seo';
import BookSelectLayout from '@/layout/BookSelectLayout';
import { selectModalDataAtom, selectModalStateAtom } from '@/recoil/modal';
import { NextPageWithLayout } from '@/types/layout';
import { selectBookProps } from '@/types/modal';

const BookRecordSelectPage: NextPageWithLayout = () => {
  const { data, status } = useQuery(['getMyBookShelf', 'select'], () =>
    getBookShelfApi(),
  );
  const [sendData, setSendData] = useRecoilState(selectModalDataAtom);
  const [modal, setModal] = useRecoilState(selectModalStateAtom);

  const selectBook = ({ isbn, thumbnail, title, author }: selectBookProps) => {
    setSendData({ ...sendData, isbn, thumbnail, title, author });
    setModal(true);
  };

  return (
    <AuthRequiredPage>
      <Seo title='다락책방 | 도서선택' />
      {status === 'success' && (
        <>
          <div>
            <h5 className='text-[13px]'>
              전체 <span className='text-main'>{data.length}</span>권
            </h5>
          </div>
          {data.length > 0 ? (
            <ul className='grid grid-cols-[repeat(3,1fr)] gap-4'>
              {data.map((item) => (
                <li
                  className='flex flex-col items-start justify-start'
                  key={item.bookIsbn}
                  onClick={() =>
                    selectBook({
                      isbn: item.bookIsbn,
                      thumbnail: item.thumbnail,
                      title: item.title,
                      author: item.authors[0],
                    })
                  }
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width='0'
                    height='0'
                    sizes='100vw'
                    className='w-full h-[9.5rem] s:h-[14rem] mb-2.5 rounded-[0px_3px_3px_0px] shadow-[0px_0px_7px_rgba(0,0,0,0.25)]'
                  />
                  <h2 className='w-full text-[13px] text-textBlack mx-0 my-[5px] text-center'>
                    {item.title}
                  </h2>
                  <h3 className='w-full text-[11px] text-textGray text-center'>
                    {item.authors[0]}
                  </h3>
                </li>
              ))}
            </ul>
          ) : (
            <div className='p-10 text-center'>등록된 책이 없습니다.</div>
          )}
          {modal && (
            <SelectModal
              isbn={sendData.isbn}
              title={sendData.title}
              thumbnail={sendData.thumbnail}
              author={sendData.author}
            />
          )}
        </>
      )}
    </AuthRequiredPage>
  );
};

BookRecordSelectPage.getLayout = function getLayout(page: ReactElement) {
  return <BookSelectLayout>{page}</BookSelectLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getMyBookShelf', 'select'], () =>
    getBookShelfApi(),
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default BookRecordSelectPage;
