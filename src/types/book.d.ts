interface KakaoBookDataResultType {
  authors: string[];
  contents: string;
  dateTime: Date;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  translators: string[];
  url: string;
  title: string;
}

export interface BookSearchResulListItem {
  thumbnail: string;
  title: string;
  authors: string[];
  publisher: string;
  isbn: string;
}

export interface getBookDataByIsbnProps {
  documents: {
    authors: string[];
    title: string;
    thumbnail: string;
    contents: string;
    publisher: string;
  }[];
}

export interface BookDataByTitleProps {
  documents: Pick<
    KakaoBookDataResultType,
    'title' | 'thumbnail' | 'authors' | 'isbn'
  >[];
}
