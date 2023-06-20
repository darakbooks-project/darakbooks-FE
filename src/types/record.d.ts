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
      data: string;
    }[];
    readAt: string;
  };
}

export interface RecordType {
  recordId: number;
  text: string;
  recordImgUrl: string;
  tags: {
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

export interface getAllMainDetailRecordsProps {
  lastId: number | null;
  records: {
    recordId: number;
    text: string;
    recordImgUrl: string;
    tags: { id: number; data: string }[];
    readAt: string;
    book: {
      title: string;
      thumbnail: string;
      bookIsbn: string;
      authors: string[];
    };
    user: {
      userId: string;
      nickname: string;
      photoUrl: string;
    };
  }[];
}
