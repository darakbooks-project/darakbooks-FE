import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface bookRecordDataProps {
  record: {
    title: string;
    thumbnail: string;
    bookIsbn: string;
    text: string;
    recordImg: string;
    recordImgUrl: string;
    tags?: {
      id: number;
      data: string | number;
    }[];
    readAt: string;
  };
}

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
