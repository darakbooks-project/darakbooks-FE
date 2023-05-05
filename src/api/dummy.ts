import axios from 'axios';

export interface BooksProps {
  id: string;
  title: string;
  description: string;
}

export const fetchDummy = async () => {
  const resposne = await axios.get(
    'https://dummy-cca81-default-rtdb.asia-southeast1.firebasedatabase.app/books.json',
  );
  const formatBooks: BooksProps[] = [];
  for (const key in resposne.data) {
    formatBooks.push({
      id: key,
      title: resposne.data[key].title,
      description: resposne.data[key].description,
    });
  }
  return formatBooks;
};
