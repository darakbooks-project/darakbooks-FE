import Link from 'next/link';
import tw from 'tailwind-styled-components/dist/tailwind';

import BookImage from '../ImageComponent';

interface SearchResultListItemProps {
  src: string;
  imageSize: string;
  title: string;
  author: string[];
  publisher: string;
  clickShiftPath: string;
}

const SearchResultListItem = ({
  src,
  imageSize,
  title,
  author,
  publisher,
  clickShiftPath,
}: SearchResultListItemProps) => {
  return (
    <>
      <Link
        href={clickShiftPath === 'search' ? '/book/detail' : '/book/select'}
        className='w-[100%] flex items-center bg-yellow-500 px-[20px] py-[15px] cursor-pointer'
      >
        <div className='w-[50%]'>
          <BookImage
            lazy={true}
            src={src}
            placeholder='스켈레톤'
            alt='책 선택 리스트 아이템의 사진 입니다.'
            size={imageSize}
          />
        </div>
        <div className='w-[50%] flex flex-col font-bold text-[15px]'>
          <span>{title}</span>
          <span>{`${author[0]} ${author[1] ? `|  ${author[1]}` : ''}`}</span>
          <span>{publisher}</span>
        </div>
      </Link>
      {/* by 민형, 독서 인원 모집 리스트 아이템 클릭 시 상세 페이지로 이동하는 것을 확인하기 위한 임시 코드이므로 나중에 제거_230528 */}
      <Link href='/recruit/detail?recruitId=1' className='bg-white'>
        독서 상세페이지로
      </Link>
    </>
  );
};

export default SearchResultListItem;
