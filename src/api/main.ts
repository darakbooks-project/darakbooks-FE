import { axiosInstance } from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//인기모임 조회
export const fetchBestGroup = async () => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `${BASE_URL}/groups/top/3`,
    });

    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

//특정 그룹 리더 조회
export const fetchBestGroupLeader = async (groupId: number) => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `${BASE_URL}/groups/${groupId}/group_lead`,
    });

    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

//독서기록 조회
export const fetchRecord = async (lastId: number) => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `${BASE_URL}/records?&lastId=${lastId}&pageSize=5`,
    });

    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};
