import { axiosInstance } from './axios';

//인기모임 조회
export const fetchBestGroup = async () => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `/groups/top/3`,
    });

    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

//특정 그룹 리더 조회
export const fetchReadingGroupLeader = async (groupId: number | string) => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `/groups/${groupId}/group_lead`,
    });

    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};
