import { useRouter } from 'next/router';

import SearchResultListItem from '@/components/common/ListItem/SearchResultListItem';
import { BookSearchResulListItem } from '@/types/book';

interface SearchResultListProps {
  listData: BookSearchResulListItem[];
}

const SearchResultList = ({ listData }: SearchResultListProps) => {
  const { asPath } = useRouter();
  const pathArr = asPath.split('/');
  const shiftPath = pathArr[pathArr.length - 1];

  return (
    <>
      {listData.map(({ thumbnail, title, authors, publisher, isbn }) => (
        <SearchResultListItem
          key={isbn}
          src={thumbnail}
          imageSize='not-feed-small'
          title={title}
          author={authors.slice(0, 2)}
          publisher={publisher}
          clickShiftPath={shiftPath}
          isbn={isbn}
        />
      ))}
    </>
  );
};

export default SearchResultList;
