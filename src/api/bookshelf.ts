import { bookshelfDataProps } from '@/types/bookshelf';

import { axiosInstance } from './axios';

interface BookshelfProps {
  bookIsbn: string;
  title: string;
  thumbnail: string;
  authors: string[];
}

// 책장에 책 추가
export const postBookshelfApi = async (bookData: bookshelfDataProps) => {
  try {
    const { data } = await axiosInstance.request({
      method: 'POST',
      url: `/bookshelf`,
      data: bookData,
    });

    return data;
  } catch (error) {
    throw new Error('책을 추가할 수 없습니다.');
  }
};

// 책장 가져오기
export const getBookShelfApi = async (
  ownerId?: string,
): Promise<BookshelfProps[]> => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/bookshelf${ownerId ? `/${ownerId}` : ''}`,
    });

    return data;
  } catch (error) {
    throw new Error('책장을 가져올 수 없습니다.');
  }
};

// 책장 속 책 삭제
export const deleteBookShelfApi = async (bookId: string) => {
  try {
    await axiosInstance.request({
      method: 'DELETE',
      url: `/bookshelf/${bookId}`,
    });
  } catch (error) {
    throw new Error('책을 삭제 할 수 없습니다.');
  }
};
