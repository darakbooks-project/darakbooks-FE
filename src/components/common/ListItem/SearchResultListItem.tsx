import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';

import { searchInfinityScrollPositionAtom } from '@/recoil/book';
import { selectModalDataAtom, selectModalStateAtom } from '@/recoil/modal';

import BookImage from '../ImageComponent';

interface SearchResultListItemProps {
  src: string;
  imageSize: string;
  title: string;
  author: string[];
  publisher: string;
  clickShiftPath: string;
  isbn: string;
}

const SearchResultListItem = ({
  src,
  imageSize,
  title,
  author,
  publisher,
  clickShiftPath,
  isbn,
}: SearchResultListItemProps) => {
  const setModal = useSetRecoilState(selectModalStateAtom);
  const setSendData = useSetRecoilState(selectModalDataAtom);
  const router = useRouter();
  const setInfinityScrollPosition = useSetRecoilState(
    searchInfinityScrollPositionAtom,
  );

  const shiftPage = () => {
    const isbnArr = isbn.split(' ');
    const isbnValue = isbnArr[0] || isbnArr[1];

    router.push(`/book/search?isbn=${isbnValue}`);
  };

  const clickBookListItem = () => {
    setInfinityScrollPosition(window.scrollY);
    if (router.pathname !== '/book/record/search') {
      shiftPage();
      return;
    }

    setSendData({
      isbn: isbn.split(' ')[0],
      title,
      thumbnail: src,
      author: author[0],
    });
    setModal(true);
  };

  return (
    <Container onClick={clickBookListItem}>
      <BookImageWrap>
        <BookImage
          lazy={true}
          src={src}
          placeholder='스켈레톤'
          alt='책 선택 리스트 아이템의 사진 입니다.'
          size={imageSize}
        />
      </BookImageWrap>
      <Introduce>
        <Title>{title}</Title>
        <AuthorPublisher>
          <span>{publisher}</span>
          <Divider>/</Divider>
          <span>{`${author[0]}`} 지음</span>
        </AuthorPublisher>
      </Introduce>
    </Container>
  );
};

export default SearchResultListItem;

const Container = tw.div`
  w-[100%]
  flex
  items-center
  px-[20px]
  py-[15px]
  cursor-pointer
  border-b-2	
`;

const BookImageWrap = tw.div`
  w-[30%]
`;

const Introduce = tw.div`
  w-[70%]
  flex
  flex-col
  pl-[10px]
`;

const Title = tw.span`
  font-bold
  mb-[5px]
`;

const AuthorPublisher = tw.div`
  flex
  text-xs
  text-black
  text-opacity-50
`;

const Divider = tw.div`
  px-[2.5px]
`;
