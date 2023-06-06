import { InternalAxiosRequestConfig } from 'axios';

const setOriginRequestAxiosHeader = (
  config: InternalAxiosRequestConfig,
  acessToken: string,
) => {
  config.headers['Authorization'] = `Bearer ${acessToken}`;
};

export { setOriginRequestAxiosHeader };
