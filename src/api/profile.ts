import { axiosInstance } from './axios';

interface myProfileProps {
  bookshelfIsHidden: boolean;
  isMine: boolean;
  nickname: string;
  photoUrl: string;
  userId: string;
  userInfo: string | null;
}

interface editDataProps {
  nickname?: string;
  photoId?: string;
  photoUrl?: string;
  userInfo?: string;
  bookshelfIsHidden?: boolean;
}

// 나의 프로필
export const getMyProfileApi = async (): Promise<myProfileProps> => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `/user/profile`,
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
      url: `/user/profile/${ownerId}`,
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
      url: `/user/photo`,
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

// 프로필 변경
export const changeProfileApi = async (editData: editDataProps) => {
  try {
    const response = await axiosInstance.request({
      method: 'PATCH',
      url: `/user/profile`,
      data: editData,
    });
    return response.data;
  } catch (error) {
    throw new Error('프로필을 수정할 수 없습니다.');
  }
};
