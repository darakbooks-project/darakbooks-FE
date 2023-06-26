import { RecommendBookResultType } from '@/types/recommend';

import { axiosInstance } from './axios';

export const postGPTRecommendBook = async (userInput: {
  userInput: string;
}): Promise<RecommendBookResultType> => {
  try {
    const response = await axiosInstance.request({
      method: 'POST',
      url: `/recs/recommendations/two`,
      data: userInput,
      timeout: 1000 * 60 * 2,
    });

    if (response) return response.data;
    throw new Error('책 추천에 실패했습니다.');
  } catch (error) {
    throw new Error('책 추천에 문제가 발생했습니다.');
  }
};
