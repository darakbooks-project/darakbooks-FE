import axios from 'axios';

import { KAKAO_REST_API_KEY } from '@/constants/auth';

const KAKAO_BOOK_SEARCH_API_URL =
  process.env.NEXT_PUBLIC_KAKAO_BOOK_SEARCH_API_URL;

export const getBookSearchResultData = async (query: string) => {
  try {
    const {
      data: { documents },
    } = await axios.get(`${KAKAO_BOOK_SEARCH_API_URL}?query=${query}&size=5`, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
    });

    return documents;
  } catch {
    throw new Error('데이터 패치 실패');
  }
};
