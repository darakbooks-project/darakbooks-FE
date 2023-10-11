import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';

import useRememberScroll from '@/hooks/useRememberScroll';
import { selectModalDataAtom, selectModalStateAtom } from '@/recoil/modal';

interface SearchResultListItemProps {
  src: string;
  title: string;
  author: string[];
  publisher: string;
  clickShiftPath: string;
  isbn: string;
}

const SearchResultListItem = ({
  src,
  title,
  author,
  publisher,
  isbn,
}: SearchResultListItemProps) => {
  const setModal = useSetRecoilState(selectModalStateAtom);
  const setSendData = useSetRecoilState(selectModalDataAtom);
  const router = useRouter();
  const { setScroll } = useRememberScroll('bookSearch');

  const shiftPage = () => {
    const isbnArr = isbn.split(' ');
    const isbnValue = isbnArr[0] || isbnArr[1];

    router.push({ pathname: '/book/detail', query: { isbn: isbnValue } });
  };

  const clickBookListItem = () => {
    setScroll();
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
        <Image
          src={src}
          width={72}
          height={104}
          alt='책 선택 리스트 아이템의 사진 입니다.'
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkkAQAAB8AG7jymN8AAAAASUVORK5CYII='
        />
      </BookImageWrap>
      <Introduce>
        <Title>{title}</Title>
        <AuthorPublisher>
          <span>{publisher}</span>
          {author[0] && (
            <>
              <Divider>/</Divider>
              <span>{`${author[0]}`} 지음</span>
            </>
          )}
        </AuthorPublisher>
      </Introduce>
    </Container>
  );
};

export default SearchResultListItem;

const Container = tw.article`
  w-full
  flex
  items-center
  p-5
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
  pl-2.5
`;

const Title = tw.span`
  font-bold
  mb-2.5
`;

const AuthorPublisher = tw.div`
  flex
  text-xs
  text-textGray
`;

const Divider = tw.div`
  px-1
`;
