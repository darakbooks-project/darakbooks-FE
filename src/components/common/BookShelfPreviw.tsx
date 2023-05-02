import Link from 'next/link';

import BookImage from './BookImage';

interface Props {
  imageSrcArr: string[];
  memberId: string;
}

const BookShelfPreview = ({ imageSrcArr, memberId }: Props) => {
  return (
    <Link
      href={`bookshelf?memberId=${memberId}`}
      className='w-[100%] h-[130px] flex justify-evenly items-center bg-gray-400 cursor-pointer'
    >
      {imageSrcArr.map((src: string) => {
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
    </Link>
  );
};

export default BookShelfPreview;
