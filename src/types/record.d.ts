export interface bookRecordDataProps {
  book: {
    bookIsbn: string;
    title: string;
    thumbnail: string;
    authors: string[];
  };
  record: {
    text: string;
    recordImg: string;
    recordImgUrl: string;
    tags?: {
      id: number;
      data: string | number;
    }[];
    readAt: string;
  };
}
