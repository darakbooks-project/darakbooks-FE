import { UserGroup } from '@/types/recruit';

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
export const fetchReadingGroupLeader = async (
  groupId: number | string,
): Promise<UserGroup> => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `/groups/${groupId}/group_lead`,
    });

    if (response) return response.data;

    throw new Error('리더를 조회할 수 없습니다.');
  } catch (error) {
    throw new Error('리더를 조회하는 과정에서 오류가 발생하였습니다.');
  }
};
