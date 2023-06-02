import axios, { InternalAxiosRequestConfig } from 'axios';

import { setAxiosHeader } from '@/utils/helpers/axiosHandler';

import { axiosInstance } from './axios';

export const login = async (code: string) => {
  try {
    const {
      data: { accessToken },
    } = await axios.get<{ accessToken: string }>(
      `http://3.36.210.43:3000/user/auth/kakao?code=${code}`,
    );

    axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

    return accessToken;
  } catch {
    return null;
  }
};

export const silentRefresh = async (
  originRequest?: InternalAxiosRequestConfig,
) => {
  try {
    const {
      data: { accessToken },
    } = await axiosInstance.request<{ accessToken: string }>({
      method: 'GET',
      url: `http://3.36.210.43:3000/user/auth/reissue`,
    });

    if (originRequest) {
      setAxiosHeader(originRequest, accessToken);
      return axiosInstance(originRequest);
    }

    return accessToken;
  } catch {
    return null;
  }
};
