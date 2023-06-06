import axios from 'axios';

import { KAKAO_REST_API_KEY } from '@/constants/auth';
import { BookSearchResulListItem } from '@/types/book';

const KAKAO_BOOK_SEARCH_API_URL =
  process.env.NEXT_PUBLIC_KAKAO_BOOK_SEARCH_API_URL;

export interface BookSearchResultListProps {
  is_end: boolean;
  documents: BookSearchResulListItem[];
}

export const getBookSearchResultData = async (
  query: string,
  page: number,
): Promise<BookSearchResultListProps> => {
  try {
    const {
      data: {
        documents,
        meta: { is_end },
      },
    } = await axios.get<{
      documents: BookSearchResulListItem[];
      meta: { is_end: boolean };
    }>(`${KAKAO_BOOK_SEARCH_API_URL}?query=${query}&size=7&page=${page}`, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
    });

    if (documents.length > 0) {
      return { is_end, documents };
    } else {
      return { is_end: true, documents: [] };
    }
  } catch {
    throw new Error('데이터 패치 실패');
  }
};

// isbn으로 책 한권 검색 api
export const getBookDataByIsbnApi = async (isbn: string) => {
  try {
    const { data } = await axios.get(
      `${KAKAO_BOOK_SEARCH_API_URL}?target=isbn&query=${isbn}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error('해당 도서를 찾을 수 없습니다.');
  }
};
