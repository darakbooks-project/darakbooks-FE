import { AxiosError } from 'axios';

import { bookshelfDataProps, RecommendBookShelfType } from '@/types/bookshelf';

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
    const { response } = error as unknown as AxiosError;
    if (response) {
      throw { status: response.status };
    }
  }
};

// 책장 가져오기
export const getBookShelfApi = async (
  ownerId?: string,
): Promise<bookshelfDataProps[]> => {
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
    const { response } = error as unknown as AxiosError;
    if (response) {
      throw { status: response.status };
    }
  }
};

//메인: 로그인 안 한 사용자 랜덤 책장 추천
export const getRandomBookShelf = async (): Promise<RecommendBookShelfType> => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/bookshelf/main/random`,
    });

    return data;
  } catch (error) {
    throw new Error('책장을 추천할 수 없습니다.');
  }
};

//메인: 로그인 한 사용자 맞춤 책장 추천
export const getCustomRecommendBookShelf =
  async (): Promise<RecommendBookShelfType> => {
    try {
      const { data } = await axiosInstance.request({
        method: 'GET',
        url: `/bookshelf/main/recommend`,
      });

      return data;
    } catch (error) {
      throw new Error('책장을 추천할 수 없습니다.');
    }
  };
