import axios from 'axios';

import { KAKAO_REST_API_KEY } from '@/constants/auth';
import { BookSearchResulListItem } from '@/types/book';

const KAKAO_BOOK_SEARCH_API_URL =
  process.env.NEXT_PUBLIC_KAKAO_BOOK_SEARCH_API_URL;

export const getBookSearchResultData = async (query: string) => {
  try {
    const {
      data: { documents },
    } = await axios.get<{ documents: BookSearchResulListItem[] }>(
      `${KAKAO_BOOK_SEARCH_API_URL}?query=${query}&size=5`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      },
    );

    if (documents.length > 0) {
      return documents;
    } else {
      return [];
    }
  } catch {
    throw new Error('데이터 패치 실패');
  }
};
