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

export interface RecordType {
  recordId: number;
  text: string;
  recordImgUrl: string;
  tag: {
    id: number;
    data: string;
  }[];
  readAt: string;
  book: BookType;
  user: UserType;
}

interface BookType {
  bookIsbn: string;
  title: string;
  thumbnail: string;
  authors: string[];
}

interface UserType {
  userId: string;
  nickname: string;
  photoUrl: string;
}
