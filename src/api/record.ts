import { bookRecordDataProps } from '@/types/record';

import { axiosInstance } from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
