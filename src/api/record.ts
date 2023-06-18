import {
  bookRecordDataProps,
  getAllMainDetailRecordsProps,
} from '@/types/record';

import { axiosInstance } from './axios';

// 이미지 등록
export const registerImageApi = async (image: FormData) => {
  try {
    const response = await axiosInstance.request({
      method: 'POST',
      url: '/records/photo',
      data: image,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('사진 등록 실패');
  }
};

// 독서기록 등록
export const registerBookRecordApi = async (
  bookRecordData: bookRecordDataProps,
) => {
  try {
    const { data } = await axiosInstance.request({
      method: 'POST',
      url: '/records',
      data: bookRecordData,
    });
    return data;
  } catch (error) {
    throw new Error('독서 기록 등록 실패');
  }
};

// 독서기록 삭제
export const deleteRecordApi = async (id: string) => {
  try {
    await axiosInstance.request({
      method: 'DELETE',
      url: `/records/${id}`,
    });
  } catch (error) {
    throw new Error('독서기록을 삭제하지 못하였습니다.');
  }
};

// 메인페이지, 도서상세 페이지에 필요한 독서기록 전체보기
export const getAllMainDetailRecordsApi = async (
  isbn: string,
  lastId: number,
  pageSize: number,
): Promise<getAllMainDetailRecordsProps> => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/records?bookID=${isbn}&lastId=${lastId}/&pageSize=${pageSize}`,
    });

    return data;
  } catch (error) {
    throw new Error('독서기록을 불러올 수 없습니다.');
  }
};

// 마이페이지 독서기록 전체보기
export const getAllRecordsApi = async (
  lastId: number,
  pageSize: number,
  ownerId = 'mine',
): Promise<getAllMainDetailRecordsProps> => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/records/${ownerId}?lastId=${lastId}&pageSize=${pageSize}`,
    });
    return data;
  } catch (error) {
    throw new Error('독서기록을 불러올 수 없습니다.');
  }
};

// 마이페이지 특정 책의 독서기록 전체보기
export const getCertainBookRecordsApi = async (
  lastId: number,
  pageSize: number,
  bookId: string,
  ownerId = 'mine',
): Promise<getAllMainDetailRecordsProps> => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/records/${ownerId}?lastId=${lastId}&pageSize=${pageSize}$bookId=${bookId}`,
    });
    return data;
  } catch (error) {
    throw new Error('독서기록을 불러올 수 없습니다.');
  }
};
