import BookImage from './BookImage';

interface shelfSizeType {
  [key: string]: string;
}

const BookShelf = () => {
  const shelfSize: shelfSizeType = {
    'type-1': 'aspect-square w-[100%]',
    'type-2': 'aspect-square w-[50%]',
    'type-3': 'aspect-square w-[33%]',
  };

  return (
    <div
      className={`${shelfSize['type-2']} bg-gray-400 flex justify-center items-center`}
    >
      <BookImage
        lazy={true}
        placeholder=''
        src='https://image.yes24.com/momo/TopCate1261/MidCate008/70353017.jpg'
        alt='책장 속의 책입니다!'
        onImageClick={() => console.log('hi')}
      />
    </div>
  );
};

export default BookShelf;
