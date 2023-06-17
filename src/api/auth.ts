import axios, { InternalAxiosRequestConfig } from 'axios';

import { setOriginRequestAxiosHeader } from '@/utils/helpers/axiosHandler';

import { axiosInstance } from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const login = async (code: string) => {
  try {
    const {
      data: { accessToken },
    } = await axiosInstance.request({
      method: 'GET',
      url: `/user/auth/kakao?code=${code}`,
    });

    axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

    return accessToken;
  } catch {
    return null;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.request({
      method: 'GET',
      url: `/user/auth/logout`,
    });

    axiosInstance.defaults.headers['Authorization'] = '';
  } catch {
    throw new Error('로그아웃 중 에러가 발생하였습니다.');
  }
};

export const silentRefresh = async (
  originRequest?: InternalAxiosRequestConfig,
) => {
  try {
    const {
      data: { accessToken },
    } = await axios.get<{ accessToken: string }>(
      `${BASE_URL}/user/auth/reissu`,
      {
        withCredentials: true,
      },
    );

    axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

    if (originRequest) {
      setOriginRequestAxiosHeader(originRequest, accessToken);
      return axiosInstance(originRequest);
    }

    return accessToken;
  } catch {
    return null;
  }
};
