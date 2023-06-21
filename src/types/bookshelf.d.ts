export interface bookshelfDataProps {
  bookIsbn: string;
  title: string;
  thumbnail: string;
  authors: string[];
}

export interface RecommendBookShelfType {
  users: {
    userId: string;
    nickname: string;
  };
  bookshelves: BookshelfProps[];
}
