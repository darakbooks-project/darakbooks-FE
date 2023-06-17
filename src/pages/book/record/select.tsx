import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React from 'react';
import { ReactElement } from 'react';
import { useRecoilState } from 'recoil';

import { getMyBookShelfApi } from '@/api/bookshelf';
import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import SelectModal from '@/components/book/record/SelectModal';
import BookSelectLayout from '@/layout/BookSelectLayout';
import {
  selectBookProps,
  selectModalDataAtom,
  selectModalStateAtom,
} from '@/recoil/modal';
import { NextPageWithLayout } from '@/types/layout';

const BookRecordSelectPage: NextPageWithLayout = () => {
  const { data, status } = useQuery(
    ['getMyBookShelf', 'select'],
    getMyBookShelfApi,
  );
  const [sendData, setSendData] = useRecoilState(selectModalDataAtom);
  const [modal, setModal] = useRecoilState(selectModalStateAtom);

  const selectBook = ({ isbn, thumbnail, title, author }: selectBookProps) => {
    setSendData({ ...sendData, isbn, thumbnail, title, author });
    setModal(true);
  };

  return (
    <AuthRequiredPage>
      {status === 'success' && (
        <>
          <div>
            <h5 className='text-[13px]'>
              전체 <span className='text-[#67a68a]'>{data.length}</span>권
            </h5>
          </div>
          <ul className='grid grid-cols-[repeat(3,1fr)] grid-rows-[repeat(4,1fr)] gap-4 overflow-scroll'>
            {data.map((item) => (
              <li
                className='flex flex-col justify-start items-start h-64'
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
                  className='w-full h-[9.5rem] mb-2.5 rounded-[0px_3px_3px_0px] shadow-[0px_0px_7px_rgba(0,0,0,0.25)]'
                />
                <h2 className='w-full text-[13px] text-[#333333] mx-0 my-[5px] text-center'>
                  {item.title}
                </h2>
                <h3 className='w-full text-[11px] text-[#707070] text-center'>
                  {item.authors[0]}
                </h3>
              </li>
            ))}
          </ul>
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

  await queryClient.prefetchQuery(
    ['getMyBookShelf', 'select'],
    getMyBookShelfApi,
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default BookRecordSelectPage;
