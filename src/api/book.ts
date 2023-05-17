import axios from 'axios';

import { KAKAO_REST_API_KEY } from '@/constants/auth';

const KAKAO_BOOK_SEARCH_API_URL =
  process.env.NEXT_PUBLIC_KAKAO_BOOK_SEARCH_API_URL;

export const getBookSearchResultData = async (query: string) => {
  console.log(query);
  try {
    const res = await axios.get(
      `${KAKAO_BOOK_SEARCH_API_URL}?query=${query}&size=5`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      },
    );

    console.log(res);
    return res;
  } catch {
    throw new Error('데이터 패치 실패');
  }
};
