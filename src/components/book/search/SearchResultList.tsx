import SearchResultListItem from '@/components/common/ListItem/SearchResultListItem';

interface SearchResultListProps {
  listData: any;
}

const SearchResultList = ({ listData }: SearchResultListProps) => {
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
        />
      ))}
    </>
  );
};

export default SearchResultList;
