import { ClassOpenStateObjProps } from '@/types/recruit';

import { axiosInstance } from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const postReadingClassOpen = async (
  openReadingClassData: ClassOpenStateObjProps,
) => {
  const body = {
    name: openReadingClassData.className,
    recruitment_status: true,
    meeting_type: openReadingClassData.classType,
    day: openReadingClassData.classDay,
    time: openReadingClassData.classTime,
    region: openReadingClassData.classRegion,
    description: openReadingClassData.classDescription,
    participant_limit: openReadingClassData.classPeopleNumber,
    open_chat_link: openReadingClassData.classKakaoLink,
  };

  try {
    const response = await axiosInstance.request({
      method: 'POST',
      url: `${BASE_URL}/groups`,
      data: body,
    });

    console.log(response);
  } catch {
    throw new Error('모임 추가 작업 중 에러가 발생하였습니다.');
  }
};

export const getReadingGroupInfo = async (groupId: string) => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `${BASE_URL}/groups/${groupId}`,
    });

    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};
