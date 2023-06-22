import { axiosInstance } from './axios';

export const getGPTRecommendBook = async (userRequest: string) => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `/recs/recommendations`,
      data: {
        userInput: userRequest,
      },
      timeout: 1000 * 60 * 3,
    });

    if (response) return response.data;
    throw new Error('책 추천에 실패했습니다.');
  } catch (error) {
    throw new Error('책 추천에 문제가 발생했습니다.');
  }
};
