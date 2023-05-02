import BookImage from './BookImage';

interface Props {
  srcArr: string[];
}

const BookShelfPreview = ({ srcArr }: Props) => {
  return (
    <div className='w-[100%] h-[130px] flex justify-evenly items-center bg-gray-400 cursor-pointer'>
      {srcArr.map((src: string) => {
        return (
          <>
            <BookImage
              lazy={true}
              placeholder=''
              src={src}
              alt='책장 미리보기 속의 책입니다!'
              feed='not-feed-small'
            />
          </>
        );
      })}
    </div>
  );
};

export default BookShelfPreview;
