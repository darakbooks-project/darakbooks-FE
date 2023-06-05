export interface bookRecordDataProps {
  title: string;
  thumbnail: string;
  bookIsbn: string;
  text: string;
  recordImg: string;
  recordImgUrl: string;
  tags?: {
    id: number;
    data: string | number;
  }[];
  readAt: string;
}
