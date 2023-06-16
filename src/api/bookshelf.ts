import { bookshelfDataProps } from '@/types/bookshelf';

import { axiosInstance } from './axios';

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
