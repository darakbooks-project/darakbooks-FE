import BookImage from '../BookImage';

interface SearchResultProps {
  src: string;
  imageSize: string;
  title: string;
  author: string;
  publisher: string;
}

const SearchResult = ({
  src,
  imageSize,
  title,
  author,
  publisher,
}: SearchResultProps) => {
  return (
    <div className='w-[100%] flex items-center bg-yellow-600 px-[20px] py-[10px]'>
      <div className='w-[50%]'>
        <BookImage
          lazy={true}
          src={src}
          placeholder='스켈레톤'
          alt='책 선택 리스트 아이템의 사진 입니다.'
          feed={imageSize}
        />
      </div>
      <div className='w-[50%] flex flex-col font-bold text-[15px]'>
        <span>{title}</span>
        <span>{author}</span>
        <span>{publisher}</span>
      </div>
    </div>
  );
};

export default SearchResult;
