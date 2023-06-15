import { axiosInstance } from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface myProfileProps {
  bookshelfIsHidden: boolean;
  isMine: boolean;
  nickname: string;
  photoUrl: string;
  userId: string;
  userInfo: string | null;
}

// 나의 프로필
export const getMyProfileApi = async (): Promise<myProfileProps> => {
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

// 프로필 사진 등록
export const registerProfileImageApi = async (image: FormData) => {
  try {
    const response = await axiosInstance.request({
      method: 'POST',
      url: `${BASE_URL}/user/photo`,
      data: image,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('사진을 등록할 수 없습니다.');
  }
};
