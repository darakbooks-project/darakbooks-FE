import axios, { AxiosError, CreateAxiosDefaults } from 'axios';

import { silentRefresh } from './auth';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const options: CreateAxiosDefaults = {
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
  baseURL: BASE_URL,
  timeout: 3000,
  withCredentials: true,
};

export const axiosInstance = axios.create({
  ...options,
});

const responseHandler = async (error: AxiosError) => {
  const { config: originRequest, response } = error;

  if (response) {
    const { statusCode } = response.data as { statusCode: number };
    console.warn(statusCode);

    if (originRequest && statusCode === 401) {
      return silentRefresh(originRequest);
    }
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(null, responseHandler);
