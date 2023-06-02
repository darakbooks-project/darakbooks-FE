import { InternalAxiosRequestConfig } from 'axios';

const setAxiosHeader = (
  config: InternalAxiosRequestConfig,
  acessToken: string,
) => {
  config.headers['Authorization'] = `Bearer ${acessToken}`;
};

export { setAxiosHeader };
