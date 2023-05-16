import axios, { CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
};

export const axiosInstance = axios.create({
  ...options,
});
