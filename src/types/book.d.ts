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
