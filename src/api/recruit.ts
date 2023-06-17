import { GroupList, GroupLists } from '@/types/recruit';
import { ClassOpenStateObjProps } from '@/types/recruit';

import { axiosInstance } from './axios';

interface getAllMyGroupsProps {
  group_id: number;
  name: string;
  recruitment_status: boolean;
  meeting_type: string;
  day: string;
  time: string;
  region: string;
  description: string;
  participant_limit: number;
  open_chat_link: string;
  group_lead: string;
  is_group_lead: boolean;
  is_participant: boolean;
  userGroup: {
    nickname: string;
    photoId: string;
    photoUrl: string;
    userInfo: string;
    gender: string;
    age: string;
    provider: string;
    groups: number[];
  }[];
}

export const getReadingClassData = async (
  page: number,
): Promise<GroupLists> => {
  try {
    const { data } = await axiosInstance.request<GroupLists>({
      method: 'GET',
      url: `/groups/find?page=${page}&limit=5`,
    });

    if (data) {
      return data;
    } else {
      throw new Error('모임 데이터를 찾을 수 없습니다.');
    }
  } catch {
    throw new Error('모임 조회 작업 중 오류가 발생하였습니다.');
  }
};

//독서모임 개설
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
    participant_limit: parseInt(openReadingClassData.classPeopleNumber),
    open_chat_link: openReadingClassData.classKakaoLink,
  };

  try {
    const response = await axiosInstance.request({
      method: 'POST',
      url: `/groups`,
      data: body,
    });

    console.log(response);
  } catch {
    throw new Error('모임 추가 작업 중 에러가 발생하였습니다.');
  }
};

//독서모임 정보 상세 조회
export const fetchReadingGroupInfo = async (groupId: string) => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `/groups/${groupId}`,
    });

    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

//독서모임 가입
export const postGroupJoinUser = async (groupId: number) => {
  try {
    await axiosInstance.request({
      method: 'POST',
      url: `/groups/user/${groupId}/join`,
    });
  } catch (error) {
    console.error(error);
  }
};

//독서모임 탈퇴
export const postGroupLeaveUser = async (groupId: number) => {
  try {
    await axiosInstance.request({
      method: 'POST',
      url: `/groups/user/${groupId}/leave`,
    });
  } catch (error) {
    console.error(error);
  }
};

interface patchReadingClassChangeType {
  groupId: number;
  groupData: Partial<GroupList>;
}

//독서모임 수정 patch api
export const patchReadingClassChange = async ({
  groupId,
  groupData,
}: patchReadingClassChangeType) => {
  try {
    await axiosInstance.request({
      method: 'PATCH',
      url: `/groups/${groupId}`,
      data: groupData,
    });
  } catch (error) {
    console.error(error);
  }
};

// 요청보내는 유저가 속한 모든 그룹 조희
export const getAllMyGroupsApi = async (): Promise<getAllMyGroupsProps[]> => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: '/groups/user-group',
    });

    return data;
  } catch (error) {
    throw new Error('그룹을 불러올 수 없습니다.');
  }
};
