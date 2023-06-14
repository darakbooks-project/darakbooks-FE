import { bookRecordDataProps } from '@/types/record';

import { axiosInstance } from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface getAllMainDetailRecordsProps {
  recordId: number;
  text: string;
  recordImgUrl: string;
  tags: { id: number; data: string }[];
  readAt: string;
  book: {
    title: string;
    thumbnail: string;
    bookIsbn: string;
    authors: string[];
  };
  user: {
    userId: string;
    nickname: string;
    photoUrl: string;
  };
}

// 이미지 등록
export const registerImageApi = async (image: FormData) => {
  try {
    const response = await axiosInstance.request({
      method: 'POST',
      url: `${BASE_URL}/records/photo`,
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
      url: `${BASE_URL}/records`,
      data: bookRecordData,
    });
    return data;
  } catch (error) {
    throw new Error('독서 기록 등록 실패');
  }
};

// 메인페이지, 도상세 페이지에 필요한 독서기록 전체보기
export const getAllMainDetailRecordsApi = async (
  isbn: string,
  lastId: number,
  pageSize: number,
): Promise<getAllMainDetailRecordsProps[]> => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `${BASE_URL}/records?bookID=${isbn}&lastId=${lastId}/&pageSize=${pageSize}`,
    });

    return data;
  } catch (error) {
    throw new Error('독서 기록을 불러올 수 없습니다.');
  }
};
