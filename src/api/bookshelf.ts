import { bookshelfDataProps } from '@/types/bookshelf';

import { axiosInstance } from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 책장에 책 추가
export const postBookshelfApi = async (bookData: bookshelfDataProps) => {
  try {
    const { data } = await axiosInstance.request({
      method: 'POST',
      url: `${BASE_URL}/bookshelf`,
      data: bookData,
    });

    return data;
  } catch (error) {
    throw new Error('책을 추가할 수 없습니다.');
  }
};
