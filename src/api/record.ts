import axios from 'axios';

import { bookRecordDataProps } from '@/types/record';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 이미지 등록
export const registerImageApi = async (image: FormData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/records/photo`, image);
    return data;
  } catch (error) {
    throw new Error('사진 등록 실패');
  }
};

// 독서기록 등록
export const registerBookRecordApi = async (
  bookRecordData: bookRecordDataProps,
) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/records`, bookRecordData);
    return data;
  } catch (error) {
    throw new Error('독서 기록 등록 실패');
  }
};
