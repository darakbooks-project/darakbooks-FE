import Link from 'next/link';

import BookImage from './BookImage';

interface BookShelfProps {
  size: 'small' | 'medium' | 'large';
  bookId: number;
}

const BookShelf = ({ size, bookId }: BookShelfProps) => {
  return (
    <Link
      href={`book/detail?bookId=${bookId}`}
      className={`${
        shelfSize[`shelf-${size}`]
      } bg-gray-400 flex justify-center items-center cursor-pointer`}
    >
      <BookImage
        lazy={true}
        placeholder=''
        src='https://image.yes24.com/momo/TopCate1261/MidCate008/70353017.jpg'
        alt='책장 속의 책입니다!'
        size='not-feed-${size}'
      />
    </Link>
  );
};

export default BookShelf;

interface shelfSizeType {
  [key: string]: string;
}

const shelfSize: shelfSizeType = {
  'shelf-large': 'aspect-square w-[100%]',
  'shelf-medium': 'aspect-square w-[50%]',
  'shelf-small': 'aspect-square w-[33%]',
};
