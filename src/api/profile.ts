import { axiosInstance } from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 나의 프로필
export const getMyProfileApi = async () => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `${BASE_URL}/user/profile`,
    });

    return response.data;
  } catch (error) {
    throw new Error('프로필을 불러올 수 없습니다.');
  }
};

// 다른 사용자 프로필
export const getUserProfileApi = async (ownerId: string) => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `${BASE_URL}/user/profile/${ownerId}`,
    });

    return response.data;
  } catch (error) {
    throw new Error('프로필을 불러올 수 없습니다.');
  }
};
