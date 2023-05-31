import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 이미지 등록 api
export const registerImageApi = async (image: FormData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/records/photo`, image);
    return data;
  } catch (error) {
    throw new Error('사진 등록 실패');
  }
};
